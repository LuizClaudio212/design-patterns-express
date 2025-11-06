import { Router, Request, Response } from 'express';
import { LoggerService } from '../parte1-singleton/LoggerService';
import { ProductBuilder } from './ProductBuilder';
import { Order } from '../parte3-chain-of-responsibility/Order';

// --- Importando Nossos Padrões Prontos ---

// 1. Chain of Responsibility (para validar o pedido)
import { InventoryValidator } from '../parte3-chain-of-responsibility/handlers/InventoryValidator';
import { FraudDetector } from '../parte3-chain-of-responsibility/handlers/FraudDetector';

// 2. Strategy (para aplicar descontos)
import { PricingService } from '../parte3-strategy/PricingService';
import { PercentageStrategy } from '../parte3-strategy/strategies/PercentageStrategy';
import { FixedValueStrategy } from '../parte3-strategy/strategies/FixedValueStrategy';

// 3. Template Method (para processar o pagamento)
import { CreditCardProcessor } from '../parte3-template-method/processors/CreditCardProcessor';
import { PaypalProcessor } from '../parte3-template-method/processors/PaypalProcessor';
import { PaymentInfo } from '../parte3-template-method/PaymentInfo';

// 4. Observer (para notificar sobre o novo pedido)
import { StockMarket } from '../parte3-observer/StockMarket';

const router = Router();
const logger = LoggerService.getInstance(); // Singleton

// --- Configuração da Cadeia de Validação ---
const inventoryValidator = new InventoryValidator();
const fraudDetector = new FraudDetector();
inventoryValidator.setNext(fraudDetector); // A cadeia de validação

// --- Rota Principal do Integrador ---
router.post('/checkout', async (req: Request, res: Response) => {
    logger.info('--- PROJETO INTEGRADOR: INICIANDO CHECKOUT ---');

    // O body da requisição será complexo
    const { cart, paymentDetails, discount } = req.body;
    // cart: { items: [{productId: "...", quantity: 1, price: 100}] }
    // paymentDetails: { method: "credit_card", ... }
    // discount: { type: "percentage", value: 10 }

    // --- 1. Padrão Builder (usado para criar o produto "virtual" do carrinho) ---
    // (Aqui estamos simulando a criação, mas o builder seria usado no cadastro)
    const product = new ProductBuilder('p1', 'Produto de Teste')
        .withPrice(cart.items[0].price)
        .withStock(100)
        .build();
    logger.info(`[Builder] Produto ${product.name} (R$${product.price}) sendo processado.`);

    // --- 2. Padrão Chain of Responsibility (Validação do Pedido) [cite: 87] ---
    const order = new Order('ord_integrador', cart.items);
    const validationResult = await inventoryValidator.handle(order); // Inicia a cadeia

    if (!validationResult || !validationResult.isValid) {
        logger.error('[Chain] Pedido REPROVADO na cadeia de validação.');
        return res.status(400).json({
            message: 'Pedido reprovado na validação',
            log: validationResult?.statusLog
        });
    }
    logger.info('[Chain] Pedido APROVADO na cadeia de validação.');

    // --- 3. Padrão Strategy (Cálculo de Desconto)
    let strategy;
    if (discount.type === 'percentage') {
        strategy = new PercentageStrategy(discount.value);
    } else {
        strategy = new FixedValueStrategy(discount.value);
    }

    const totalAmount = cart.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    const pricingService = new PricingService(strategy);
    const finalPrice = pricingService.calculateFinalPrice(totalAmount);
    logger.info(`[Strategy] Preço final calculado: R$${finalPrice}`);

    // --- 4. Padrão Template Method (Processamento do Pagamento)
    // (Aqui também usamos o Adapter, pois o Template Method poderia
    // chamar internamente um Adapter para um gateway de pagamento)
    let paymentProcessor;
    const paymentInfo: PaymentInfo = {
        ...paymentDetails,
        amount: finalPrice,
        log: []
    };

    if (paymentDetails.method === 'credit_card') {
        paymentProcessor = new CreditCardProcessor();
    } else {
        paymentProcessor = new PaypalProcessor();
    }

    const paymentResult = paymentProcessor.processPayment(paymentInfo);
    logger.info(`[Template Method] Log de Pagamento: ${paymentResult.log.join(' -> ')}`);

    if (paymentResult.log.some(l => l.includes('Falha'))) {
        logger.error('[Template Method] Pagamento FALHOU.');
        return res.status(400).json({ message: 'Pagamento falhou', log: paymentResult.log });
    }

    // --- 5. Padrão Observer (Notificação de Estoque)
    const stockObserver = StockMarket.getInstance(); // Reutilizando o observer de ações
    stockObserver.updateStockPrice(product.id, product.stock - cart.items[0].quantity);
    logger.info('[Observer] Observadores de estoque notificados.');

    // --- 6. Padrão Facade (O PRÓPRIO EXERCÍCIO)
    // A Facade é o que acabamos de fazer: simplificamos uma operação complexa
    // (checkout) em uma única chamada de API.

    logger.info('--- PROJETO INTEGRADOR: CHECKOUT CONCLUÍDO ---');
    res.status(200).json({
        message: 'Checkout concluído com sucesso (Padrões Integrados)!',
        finalPrice,
        validationLog: validationResult.statusLog,
        paymentLog: paymentResult.log
    });
});

export default router;