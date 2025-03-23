import { queryBus } from "../../lib/queryBus.js";
import { QUERY_NAMES } from "../../lib/utils/queryNames.js";
import { UserService } from "../../services/user/user.service.js";

const userService = new UserService();

queryBus.register(QUERY_NAMES.GET_USER_PROFILE, async (username) => {
    return userService.getUserProfile(username);
});

queryBus.register(QUERY_NAMES.GET_SUGGESTED_USERS, async (userId) => {
    return userService.getSuggestedUsers(userId);
});
