import { PaymentInfo } from '../PaymentInfo';
import { AbstractPaymentProcessor } from './AbstractPaymentProcessor';

// Implementa as etapas específicas para Cartão de Crédito 
export class CreditCardProcessor extends AbstractPaymentProcessor {

    protected validate(info: PaymentInfo): boolean {
        info.log.push('[CreditCard] Validando dados do cartão...');
        const details = info.cardDetails;
        if (!details || details.number.length !== 16 || details.cvv.length !== 3) {
            info.log.push('Dados do cartão inválidos.');
            return false;
        }
        return true;
    }

    protected executeProcessing(info: PaymentInfo): void {
        info.log.push(`[CreditCard] Cobrando R$${info.amount} no cartão ${info.cardDetails?.number.slice(-4)}...`);
        // Simula uma falha
        if (info.cardDetails?.number.endsWith('0000')) {
            throw new Error('Cartão recusado pelo emissor.');
        }
        info.log.push('[CreditCard] Cobrança aprovada.');
    }

    // Sobrescreve a etapa de notificação
    protected sendNotification(info: PaymentInfo): void {
        info.log.push('Enviando notificação de SMS e E-mail para compra no cartão.');
        console.log(`[Notification-CC] SMS enviado para compra de R$${info.amount}.`);
    }
}

