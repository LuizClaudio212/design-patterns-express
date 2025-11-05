import { Router, Request, Response } from 'express';
import { Order } from './Order';
import { InventoryValidator } from './handlers/InventoryValidator';
import { FraudDetector } from './handlers/FraudDetector';
// Importe outros handlers aqui (PricingCalculator, etc.)

const router = Router();

// --- CONFIGURAÇÃO DA CADEIA ---
// 1. Instancia os handlers
const inventory = new InventoryValidator();
const fraud = new FraudDetector();
// const pricing = new PricingCalculator();
// const persister = new OrderPersister();

// 2. Monta a cadeia na ordem correta [cite: 65]
// A ordem é: inventory -> fraud -> (null)
inventory.setNext(fraud);
// .setNext(pricing)
// .setNext(persister);
// -----------------------------

router.post('/process-order', async (req: Request, res: Response) => {
    const { orderId, items } = req.body;

    if (!orderId || !items) {
        return res.status(400).json({ error: 'orderId e items são obrigatórios' });
    }

    const order = new Order(orderId, items);

    // 3. Inicia o processamento no PRIMEIRO handler da cadeia
    console.log(`[Chain] Processando pedido ${order.id}...`);
    const processedOrder = await inventory.handle(order);

    if (processedOrder && processedOrder.isValid) {
        logger.info(`[Chain] Pedido ${processedOrder.id} processado com sucesso.`);
        res.status(200).json({
            message: 'Pedido processado com sucesso!',
            orderId: processedOrder.id,
            log: processedOrder.statusLog,
        });
    } else {
        logger.warn(`[Chain] Falha ao processar pedido ${order.id}.`);
        res.status(400).json({
            message: 'Falha no processamento do pedido.',
            orderId: order.id,
            log: order.statusLog,
        });
    }
});

// Usei o Logger da Parte 1, então precisamos importá-lo
import { LoggerService } from '../parte1-singleton/LoggerService';
const logger = LoggerService.getInstance();

export default router;