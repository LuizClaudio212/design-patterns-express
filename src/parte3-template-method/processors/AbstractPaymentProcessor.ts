import { PaymentInfo } from '../PaymentInfo';

// A classe abstrata que define o esqueleto 
export abstract class AbstractPaymentProcessor {

    // Este é o TEMPLATE METHOD
    // Ele é 'final' (não pode ser sobrescrito) e define o fluxo
    public processPayment(info: PaymentInfo): PaymentInfo {
        info.log.push('[TemplateMethod] Iniciando processamento...');

        // 1. Etapa de Validação (abstrata)
        if (!this.validate(info)) {
            info.log.push('Falha na validação.');
            return info;
        }
        info.log.push('Validação OK.');

        // 2. Etapa de Processamento (abstrata)
        try {
            this.executeProcessing(info);
            info.log.push('Processamento OK.');
        } catch (error) {
            info.log.push(`Falha no processamento: ${(error as Error).message}`);
            return info;
        }

        // 3. Etapa de Notificação (concreta, com implementação padrão)
        this.sendNotification(info);

        info.log.push('Processamento concluído.');
        return info;
    }

    // ETAPAS ABSTRATAS (a serem implementadas pelas subclasses)
    protected abstract validate(info: PaymentInfo): boolean;
    protected abstract executeProcessing(info: PaymentInfo): void;

    // ETAPA CONCRETA (opcional, pode ser sobrescrita)
    protected sendNotification(info: PaymentInfo): void {
        info.log.push('Enviando notificação padrão de pagamento.');
        console.log(`[Notification] Pagamento de R$${info.amount} processado.`);
    }
}