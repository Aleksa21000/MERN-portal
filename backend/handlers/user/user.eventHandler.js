import { eventBus } from "../../lib/eventBus.js";
import { EVENT_NAMES } from "../../lib/utils/eventNames.js";
import { UserFollowService } from "../../services/user/userFollow.service.js";

const userFollowService = new UserFollowService();

eventBus.register(EVENT_NAMES.FOLLOW_UNFOLLOW_USER, async (data) => {
    await userFollowService.followUnfollowUser(data.currentUserId, data.targetUserId);
});
