import { queryBus } from "../../lib/queryBus.js";
import { QUERY_NAMES } from "../../lib/utils/queryNames.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

queryBus.register(QUERY_NAMES.SIGNUP_USER, async (data) => {
    return authService.signup(data);
});

queryBus.register(QUERY_NAMES.LOGIN_USER, async (data) => {
    return authService.login(data);
});

queryBus.register(QUERY_NAMES.GET_ME, async (userId) => {
    return authService.getMe(userId);
});
