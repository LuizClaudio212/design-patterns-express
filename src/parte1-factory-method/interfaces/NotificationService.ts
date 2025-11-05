
export interface NotificationService {
    sendNotification(
        recipient: string,
        subject: string,
        content: string
    ): Promise<void>;
}