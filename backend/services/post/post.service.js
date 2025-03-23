import { PostRepository } from "../../repository/post.repository.js";
import { UserRepository } from "../../repository/user.repository.js";

const postRepository = new PostRepository();
const userRepository = new UserRepository();

export class PostService {
    async getPostById(postId) {
        const post = await postRepository.getPostById(postId);
        if (!post) throw new Error("Post not found");
        return post;
    }

    async getAllPosts() {
        return postRepository.getAllPosts();
    }

    async getLikedPosts(userId) {
        const user = await userRepository.findUserById(userId);
        if (!user.likedPosts || user.likedPosts.length === 0) return [];
        return postRepository.getLikedPosts(user.likedPosts);
    }

    async getFollowingPosts(followingUsers) {
        return postRepository.getFollowingPosts(followingUsers);
    }

    async getUserPosts(username) {
        const user = await userRepository.getUserByUsername(username);
        return postRepository.getUserPosts(user._id);
    }
}
