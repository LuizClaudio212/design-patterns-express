import { PaymentInfo } from '../PaymentInfo';
import { AbstractPaymentProcessor } from './AbstractPaymentProcessor';

// Implementa as etapas específicas para PayPal 
export class PaypalProcessor extends AbstractPaymentProcessor {

    protected validate(info: PaymentInfo): boolean {
        info.log.push(`[PayPal] Validando e-mail: ${info.paypalEmail}...`);
        if (!info.paypalEmail || !info.paypalEmail.includes('@')) {
            info.log.push('E-mail do PayPal inválido.');
            return false;
        }
        return true;
    }

    protected executeProcessing(info: PaymentInfo): void {
        info.log.push(`[PayPal] Redirecionando para login PayPal e cobrando R$${info.amount}...`);
        info.log.push('[PayPal] Pagamento aprovado via PayPal.');
    }

    // Não sobrescreve 'sendNotification', então usa a padrão
}