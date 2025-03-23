import { queryBus } from "../../lib/queryBus.js";
import { QUERY_NAMES } from "../../lib/utils/queryNames.js";
import { NotificationService } from "../../services/notification/notification.service.js";

const notificationService = new NotificationService();

queryBus.register(QUERY_NAMES.GET_NOTIFICATIONS, async (userId) => {
    return notificationService.getNotifications(userId);
});

queryBus.register(QUERY_NAMES.DELETE_NOTIFICATIONS, async (userId) => {
    return notificationService.deleteNotifications(userId);
});
