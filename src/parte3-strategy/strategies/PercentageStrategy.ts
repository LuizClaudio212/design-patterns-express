import { DiscountStrategy } from '../interfaces/DiscountStrategy';

// Implementa o desconto percentual [cite: 59]
export class PercentageStrategy implements DiscountStrategy {
    private percentage: number;

    constructor(percentage: number) {
        this.percentage = percentage; // ex: 10 para 10%
    }

    applyDiscount(amount: number): number {
        const discount = amount * (this.percentage / 100);
        console.log(`[PercentageStrategy] Aplicando ${this.percentage}% de desconto. (R$${discount})`);
        return amount - discount;
    }
}