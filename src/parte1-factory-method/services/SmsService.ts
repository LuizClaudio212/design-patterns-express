import { NotificationService } from '../interfaces/NotificationService';

export class SmsService implements NotificationService {
    async sendNotification(
        recipient: string,
        subject: string, // SMS não usa 'subject', mas o contrato exige
        content: string
    ): Promise<void> {
        // Lógica real de envio de SMS (simulada)
        console.log('--- SERVIÇO DE SMS ---');
        console.log(`Destinatário (Telefone): ${recipient}`);
        console.log(`Conteúdo: ${content}`);
        console.log('SMS enviado com sucesso.');
    }
}