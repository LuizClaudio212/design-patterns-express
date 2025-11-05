export class PaymentService {
    processPayment(orderId: string, amount: number): boolean {
        console.log(`[PaymentService] Processando pagamento de R$${amount} para pedido ${orderId}`);
        return true; // Simula pagamento aprovado
    }
}