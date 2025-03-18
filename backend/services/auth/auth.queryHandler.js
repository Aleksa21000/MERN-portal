import { queryBus } from "../../lib/queryBus.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

queryBus.register("SignupUser", async (data) => {
    const { res, ...userData } = data;
    return authService.signup(userData, res);
});

queryBus.register("LoginUser", async (data) => {
    const { res, ...userData } = data;
    return authService.login(userData, res);
});

queryBus.register("GetMe", async (userId) => {
    return authService.getMe(userId);
});
