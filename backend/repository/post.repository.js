import Post from "../models/post.model.js";

export class PostRepository {
    async createPost(userId, text, img) {
        const newPost = new Post({ user: userId, text, img });
        return await newPost.save();
    }

    async deletePost(postId) {
        return await Post.findByIdAndDelete(postId);
    }

    async getPostById(postId, populateFullUser = false) {
        const query = Post.findById(postId).populate("likes", "_id");

        if (populateFullUser) {
            query.populate("user");
        } else {
            query.populate("user", "_id");
        }

        return await query;
    }

    async getAllPosts() {
        return await Post.find()
            .sort({ createdAt: -1 })
            .populate("user", "-password")
            .populate("comments.user", "-password");
    }

    async getLikedPosts(userLikedPosts) {
        return await Post.find({ _id: { $in: userLikedPosts } })
            .sort({ createdAt: -1 })
            .populate("user", "-password")
            .populate("comments.user", "-password");
    }

    async getFollowingPosts(followingUsers) {
        return await Post.find({ user: { $in: followingUsers } })
            .sort({ createdAt: -1 })
            .populate("user", "-password")
            .populate("comments.user", "-password");
    }

    async getUserPosts(userId) {
        return await Post.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate("user", "-password")
            .populate("comments.user", "-password");
    }

    async likePost(postId, userId) {
        return await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });
    }

    async unlikePost(postId, userId) {
        return await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });
    }

    async commentOnPost(postId, comment) {
        const post = await Post.findById(postId);
        post.comments.push({ user: comment.user, text: comment.text });
        await post.save();

        return await Post.findById(postId)
            .populate("user", "username fullName profileImg")
            .populate("comments.user", "username fullName profileImg");
    }
}
