import { NotificationRepository } from "../../repository/notification.repository.js";

const notificationRepository = new NotificationRepository();

export class NotificationService {
    async getNotifications(userId) {
        const notifications = await notificationRepository.getNotificationsByUserId(userId);
        await notificationRepository.markNotificationsAsRead(userId);
        return notifications;
    }

    async deleteNotifications(userId) {
        await notificationRepository.deleteNotificationsByUserId(userId);
        return { message: "Notifications deleted successfully" };
    }
}
