import { NotificationService } from '../interfaces/NotificationService';

export class PushService implements NotificationService {
    async sendNotification(
        recipient: string, // Seria um device_token
        subject: string,
        content: string
    ): Promise<void> {
        // Lógica real de envio de Push (simulada)
        console.log('--- SERVIÇO DE PUSH NOTIFICATION ---');
        console.log(`Destinatário (Token): ${recipient}`);
        console.log(`Título: ${subject}`);
        console.log(`Mensagem: ${content}`);
        console.log('Push Notification enviado com sucesso.');
    }
}