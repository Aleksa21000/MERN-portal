import { eventBus } from "../../lib/eventBus.js";
import { EVENT_NAMES } from "../../lib/utils/eventNames.js";
import { UserRepository } from "../../repository/user.repository.js";
import { PostRepository } from "../../repository/post.repository.js";

const userRepository = new UserRepository();
const postRepository = new PostRepository();

eventBus.register(EVENT_NAMES.USER_FOLLOWED, async ({ followerId, followedId }) => {
    await userRepository.createNotification({
        type: "follow",
        from: followerId,
        to: followedId,
    });
});

eventBus.register(EVENT_NAMES.LIKE_POST, async ({ postId, userId }) => {
    const post = await postRepository.getPostById(postId);
    if (!post) return;

    const postOwnerId = post.user?._id ? post.user._id.toString() : post.user.toString();
    if (userId === postOwnerId) return;

    await userRepository.createNotification({
        type: "like",
        from: userId,
        to: postOwnerId,
        post: postId,
    });
});
