import { eventBus } from "../../lib/eventBus.js";
import { EVENT_NAMES } from "../../lib/utils/eventNames.js";
import { PostInteractionService } from "../../services/post/postInteraction.service.js";

const postInteractionService = new PostInteractionService();

eventBus.register(EVENT_NAMES.LIKE_POST, async ({ postId, userId }) => {
    return postInteractionService.likePost(postId, userId);
});

eventBus.register(EVENT_NAMES.UNLIKE_POST, async ({ postId, userId }) => {
    return postInteractionService.unlikePost(postId, userId);
});
