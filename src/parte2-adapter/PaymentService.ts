import { LegacyPaymentProcessor } from './legacy/LegacyPaymentProcessor';

export class PaymentService {
    // O serviço depende da interface LEGADA, não da implementação
    private paymentProcessor: LegacyPaymentProcessor;

    constructor(paymentProcessor: LegacyPaymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }

    // O código do serviço continua chamando o método antigo
    checkout(orderId: string, amount: number) {
        console.log(`Iniciando checkout para pedido: ${orderId}`);
        const success = this.paymentProcessor.processPayment(orderId, amount); // 

        if (success) {
            console.log(`Pedido ${orderId} pago com sucesso!`);
            return { status: 'success', orderId };
        } else {
            console.log(`Falha no pagamento do pedido ${orderId}.`);
            return { status: 'failed', orderId };
        }
    }
}