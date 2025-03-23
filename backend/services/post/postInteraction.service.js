import { PostRepository } from "../../repository/post.repository.js";

const postRepository = new PostRepository();

export class PostInteractionService {
    async likePost(postId, userId) {
        return postRepository.likePost(postId, userId);
    }

    async unlikePost(postId, userId) {
        return postRepository.unlikePost(postId, userId);
    }
}
