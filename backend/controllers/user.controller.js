import { queryBus } from "../lib/queryBus.js";
import { eventBus } from "../lib/eventBus.js";
import { commandBus } from "../lib/commandBus.js";
import { QUERY_NAMES } from "../lib/utils/queryNames.js";
import { EVENT_NAMES } from "../lib/utils/eventNames.js";
import { COMMAND_NAMES } from "../lib/utils/commandNames.js";

export const getUserProfile = async (req, res, next) => {
    try {
        const user = await queryBus.execute(QUERY_NAMES.GET_USER_PROFILE, req.params.username);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const followUnfollowUser = async (req, res, next) => {
    try {
        await eventBus.publish(EVENT_NAMES.FOLLOW_UNFOLLOW_USER, {
            currentUserId: req.user?._id,
            targetUserId: req.params.id,
        });

        res.status(200).json({ message: "Successfully" });
    } catch (error) {
        next(error);
    }
};

export const getSuggestedUsers = async (req, res, next) => {
    try {
        const users = await queryBus.execute(QUERY_NAMES.GET_SUGGESTED_USERS, req.user._id);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await commandBus.execute(COMMAND_NAMES.UPDATE_USER, {
            userId: req.user._id,
            updateData: req.body,
        });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
