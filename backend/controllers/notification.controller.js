import { queryBus } from "../lib/queryBus.js";
import { QUERY_NAMES } from "../lib/utils/queryNames.js";

export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await queryBus.execute(QUERY_NAMES.GET_NOTIFICATIONS, req.user._id);
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

export const deleteNotifications = async (req, res, next) => {
    try {
        const result = await queryBus.execute(QUERY_NAMES.DELETE_NOTIFICATIONS, req.user._id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
