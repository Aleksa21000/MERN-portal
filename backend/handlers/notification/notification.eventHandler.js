import { eventBus } from "../../lib/eventBus.js";
import { EVENT_NAMES } from "../../lib/utils/eventNames.js";
import { UserRepository } from "../../repository/user.repository.js";

const userRepository = new UserRepository();

eventBus.register(EVENT_NAMES.USER_FOLLOWED, async ({ followerId, followedId }) => {
    await userRepository.createNotification({
        type: "follow",
        from: followerId,
        to: followedId,
    });
});
