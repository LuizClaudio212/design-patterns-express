import { DiscountStrategy } from "../interfaces/DiscountStrategy";

export class FixedValueStrategy implements DiscountStrategy {
    private discountValue: number;

    constructor(discountValue: number) {
        this.discountValue = discountValue; // ex: 50 para R$50,00
    }

    applyDiscount(amount: number): number {
        console.log(`[FixedValueStrategy] Aplicando R$${this.discountValue} de desconto fixo.`);
        // Garante que o preço não fique negativo
        return Math.max(0, amount - this.discountValue);
    }
}