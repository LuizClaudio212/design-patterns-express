import { Router, Request, Response } from 'express';
import { NotificationFactory, NotificationType } from './NotificationFactory';

const router = Router();

router.post('/send', async (req: Request, res: Response) => {
    try {
        const { type, recipient, subject, content } = req.body;

        // 1. Valida o tipo
        if (!['email', 'sms', 'push'].includes(type)) {
            return res.status(400).json({ error: 'Tipo de notificação inválido' });
        }

        // 2. Pede à FÁBRICA para criar o serviço
        const notificationService = NotificationFactory.createNotificationService(
            type as NotificationType
        );

        // 3. Usa o serviço (sem saber qual é)
        await notificationService.sendNotification(recipient, subject, content);

        res.status(200).json({ message: `Notificação do tipo '${type}' enviada.` });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;