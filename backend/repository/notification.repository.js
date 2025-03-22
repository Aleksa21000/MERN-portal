import Notification from "../models/notification.model.js";

export class NotificationRepository {
    async getNotificationsByUserId(userId) {
        return await Notification.find({ to: userId }).populate({
            path: "from",
            select: "username profileImg",
        });
    }

    async markNotificationsAsRead(userId) {
        return await Notification.updateMany({ to: userId }, { read: true });
    }

    async deleteNotificationsByUserId(userId) {
        return await Notification.deleteMany({ to: userId });
    }
}
