import { NotificationService } from './interfaces/NotificationService';
import { EmailService } from './services/EmailService';
import { SmsService } from './services/SmsService';
import { PushService } from './services/PushService';

export type NotificationType = 'email' | 'sms' | 'push';

export class NotificationFactory {
    // O "Factory Method"
    public static createNotificationService(
        type: NotificationType
    ): NotificationService {
        switch (type) {
            case 'email':
                return new EmailService();
            case 'sms':
                return new SmsService();
            case 'push':
                return new PushService();
            default:
                // Lança um erro se o tipo for desconhecido
                throw new Error('Tipo de notificação inválido');
        }
    }
}