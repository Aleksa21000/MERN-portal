import { UserRepository } from "../../repository/user.repository.js";
import { eventBus } from "../../lib/eventBus.js";
import { EVENT_NAMES } from "../../lib/utils/eventNames.js";

const userRepository = new UserRepository();

export class UserFollowService {
    async followUnfollowUser(currentUserId, targetUserId) {
        if (currentUserId === targetUserId) throw new Error("You can't follow/unfollow yourself");

        const userToModify = await userRepository.findUserById(targetUserId);
        const currentUser = await userRepository.findUserById(currentUserId);
        if (!userToModify || !currentUser) throw new Error("User not found");

        const isFollowing = currentUser.following.includes(targetUserId);
        if (isFollowing) {
            await userRepository.unfollowUser(currentUserId, targetUserId);
            return { message: "User unfollowed successfully" };
        } else {
            await userRepository.followUser(currentUserId, targetUserId);

            eventBus.publish(EVENT_NAMES.USER_FOLLOWED, {
                followerId: currentUserId,
                followedId: targetUserId,
            });

            return { message: "User followed successfully" };
        }
    }
}
