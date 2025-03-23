import { queryBus } from "../../lib/queryBus.js";
import { QUERY_NAMES } from "../../lib/utils/queryNames.js";
import { PostService } from "../../services/post/post.service.js";

const postService = new PostService();

queryBus.register(QUERY_NAMES.GET_POST_BY_ID, async (postId) => {
    return postService.getPostById(postId);
});

queryBus.register(QUERY_NAMES.GET_ALL_POSTS, async () => {
    return postService.getAllPosts();
});

queryBus.register(QUERY_NAMES.GET_LIKED_POSTS, async (userId) => {
    return postService.getLikedPosts(userId);
});

queryBus.register(QUERY_NAMES.GET_FOLLOWING_POSTS, async (followingUsers) => {
    return postService.getFollowingPosts(followingUsers);
});

queryBus.register(QUERY_NAMES.GET_USER_POSTS, async (username) => {
    return postService.getUserPosts(username);
});
