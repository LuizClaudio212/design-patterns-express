import { DiscountStrategy } from './interfaces/DiscountStrategy';

// Este é o "Context"
export class PricingService {
    private strategy: DiscountStrategy;

    // O Contexto recebe a estratégia (via injeção)
    constructor(strategy: DiscountStrategy) {
        this.strategy = strategy;
    }

    // Permite trocar a estratégia em tempo de execução
    public setStrategy(strategy: DiscountStrategy) {
        this.strategy = strategy;
    }

    // O Contexto delega o cálculo para o objeto Strategy
    public calculateFinalPrice(amount: number) {
        console.log(`[PricingService] Calculando preço final para R$${amount}`);
        const finalPrice = this.strategy.applyDiscount(amount);
        console.log(`[PricingService] Preço final: R$${finalPrice}`);
        return finalPrice;
    }
}