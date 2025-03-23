import { PostRepository } from "../../repository/post.repository.js";
import { v2 as cloudinary } from "cloudinary";

const postRepository = new PostRepository();

export class PostManagementService {
    async createPost(userId, text, img) {
        if (!text && !img) throw new Error("Post must have text and/or an image");

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        return postRepository.createPost(userId, text, img);
    }

    async deletePost(postId, userId) {
        const post = await postRepository.getPostById(postId, true);
        if (!post) throw new Error("Post not found");

        if (post.user._id.toString() !== userId.toString()) {
            throw new Error("Unauthorized to delete this post");
        }

        if (post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        return postRepository.deletePost(postId);
    }

    async commentOnPost(postId, userId, text, username) {
        if (!text) throw new Error("Comment text is required");

        const post = await postRepository.getPostById(postId);
        if (!post) throw new Error("Post not found");

        const comment = { user: userId, text, username };

        return postRepository.commentOnPost(postId, comment);
    }
}
