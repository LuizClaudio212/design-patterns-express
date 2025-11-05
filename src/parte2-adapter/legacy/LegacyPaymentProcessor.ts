// Esta é a interface que o código antigo usa
export interface LegacyPaymentProcessor {
    processPayment(orderId: string, amount: number): boolean;
}