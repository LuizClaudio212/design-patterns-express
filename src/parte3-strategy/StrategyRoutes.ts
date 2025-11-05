import { Router, Request, Response } from 'express';
import { PricingService } from './PricingService';
import { DiscountStrategy } from './interfaces/DiscountStrategy';
import { PercentageStrategy } from './strategies/PercentageStrategy';
import { FixedValueStrategy } from './strategies/FixedValueStrategy';
import { LoggerService } from '../parte1-singleton/LoggerService'; // Usando nosso logger!

const router = Router();
const logger = LoggerService.getInstance();

router.post('/calculate-price', (req: Request, res: Response) => {
    // type: 'percentage' | 'fixed'
    // value: (10 para 10%) ou (50 para R$50)
    const { amount, discountType, discountValue } = req.body;

    if (amount === undefined || !discountType || discountValue === undefined) {
        return res.status(400).json({ error: 'amount, discountType e discountValue são obrigatórios' });
    }

    let strategy: DiscountStrategy;

    // A "fábrica" de estratégias (poderia ser um Factory Method)
    if (discountType === 'percentage') {
        strategy = new PercentageStrategy(Number(discountValue));
    } else if (discountType === 'fixed') {
        strategy = new FixedValueStrategy(Number(discountValue));
    } else {
        return res.status(400).json({ error: 'Tipo de desconto inválido' });
    }

    // 1. Cria o serviço "Context"
    // 2. Injeta a estratégia "Concrete Strategy"
    const pricingService = new PricingService(strategy);

    // 3. O serviço usa a estratégia para calcular
    const finalPrice = pricingService.calculateFinalPrice(Number(amount));
    logger.info(`[Strategy] Preço final calculado: ${finalPrice}`);

    res.status(200).json({ originalAmount: amount, finalPrice });
});

export default router;