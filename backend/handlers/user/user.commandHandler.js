import { commandBus } from "../../lib/commandBus.js";
import { COMMAND_NAMES } from "../../lib/utils/commandNames.js";
import { UserProfileService } from "../../services/user/userProfile.service.js";

const userProfileService = new UserProfileService();

commandBus.register(COMMAND_NAMES.UPDATE_USER, async (data) => {
    return userProfileService.updateUser(data.userId, data.updateData);
});
