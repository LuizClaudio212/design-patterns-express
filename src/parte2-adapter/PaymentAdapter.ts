import { LegacyPaymentProcessor } from './legacy/LegacyPaymentProcessor';
import { NewPaymentSystem, PaymentRequest } from './new/NewPaymentSystem';

// O Adapter implementa a interface LEGADA
export class PaymentAdapter implements LegacyPaymentProcessor {

    // Mas ele "embrulha" (contém) uma instância do NOVO sistema
    private newPaymentSystem: NewPaymentSystem;

    constructor(newSystem: NewPaymentSystem) {
        this.newPaymentSystem = newSystem;
    }

    // Este é o método da interface LEGADA
    processPayment(orderId: string, amount: number): boolean { // 
        console.log('--- ADAPTER EM AÇÃO ---');
        console.log(`Recebida chamada legada para OrderID: ${orderId}, Valor: ${amount}`);

        // 1. TRADUÇÃO: Converte os parâmetros antigos em um objeto novo
        const request: PaymentRequest = {
            transactionId: orderId,
            total: amount,
            paymentMethod: 'credit_card', // Assume um padrão, pois o antigo não tinha
        };

        console.log('Traduzindo para o formato do Novo Sistema...');

        // 2. CHAMADA: Chama o método do NOVO sistema
        const result = this.newPaymentSystem.executePayment(request); // 

        // 3. TRADUÇÃO (RETORNO): Converte a resposta nova para o formato antigo (boolean)
        console.log(`Novo sistema respondeu com status: ${result.status}`);
        return result.status === 'approved';
    }
}