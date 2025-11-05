export interface DiscountStrategy {
    applyDiscount(amount: number): number;
}