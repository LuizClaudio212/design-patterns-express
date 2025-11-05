// Este é o objeto que o novo sistema espera
export type PaymentRequest = {
    transactionId: string;
    total: number;
    paymentMethod: 'credit_card' | 'paypal';
};

// Esta é a nova classe com a interface incompatível
export class NewPaymentSystem {

    executePayment(request: PaymentRequest): { status: string; txId: string } {
        console.log('--- NOVO SISTEMA DE PAGAMENTO ---');
        console.log(`Processando pagamento para: ${request.transactionId}`);
        console.log(`Valor: ${request.total}`);
        console.log(`Método: ${request.paymentMethod}`);

        // Simula uma resposta de sucesso
        return { status: 'approved', txId: `new_tx_${Date.now()}` };
    }
}