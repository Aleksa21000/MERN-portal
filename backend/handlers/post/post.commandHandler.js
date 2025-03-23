import { commandBus } from "../../lib/commandBus.js";
import { COMMAND_NAMES } from "../../lib/utils/commandNames.js";
import { PostManagementService } from "../../services/post/postManagement.service.js";

const postManagementService = new PostManagementService();

commandBus.register(COMMAND_NAMES.CREATE_POST, async ({ userId, text, img }) => {
    return postManagementService.createPost(userId, text, img);
});

commandBus.register(COMMAND_NAMES.DELETE_POST, async ({ postId, userId }) => {
    return postManagementService.deletePost(postId, userId);
});

commandBus.register(COMMAND_NAMES.COMMENT_ON_POST, async ({ postId, userId, text, username }) => {
    return postManagementService.commentOnPost(postId, userId, text, username);
});
