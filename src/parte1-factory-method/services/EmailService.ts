import { NotificationService } from '../interfaces/NotificationService';

export class EmailService implements NotificationService {
    async sendNotification(
        recipient: string,
        subject: string,
        content: string
    ): Promise<void> {
        // Lógica real de envio de e-mail (simulada)
        console.log('--- SERVIÇO DE E-MAIL ---');
        console.log(`Destinatário: ${recipient}`);
        console.log(`Assunto: ${subject}`);
        console.log(`Conteúdo: ${content}`);
        console.log('E-mail enviado com sucesso.');
    }
}