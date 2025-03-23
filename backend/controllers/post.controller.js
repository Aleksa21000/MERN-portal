import { queryBus } from "../lib/queryBus.js";
import { eventBus } from "../lib/eventBus.js";
import { commandBus } from "../lib/commandBus.js";
import { QUERY_NAMES } from "../lib/utils/queryNames.js";
import { EVENT_NAMES } from "../lib/utils/eventNames.js";
import { COMMAND_NAMES } from "../lib/utils/commandNames.js";

export const createPost = async (req, res, next) => {
    try {
        const { text, img } = req.body;
        const userId = req.user._id;

        const newPost = await commandBus.execute(COMMAND_NAMES.CREATE_POST, { userId, text, img });
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        await commandBus.execute(COMMAND_NAMES.DELETE_POST, {
            postId: req.params.id,
            userId: req.user._id,
        });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const commentOnPost = async (req, res, next) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id.toString();
        const username = req.user.username;

        const comments = await commandBus.execute(COMMAND_NAMES.COMMENT_ON_POST, {
            postId,
            userId,
            text,
            username,
        });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

export const likeUnlikePost = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        const postId = req.params.id;

        // Determine whether to like or unlike based on current state
        const post = await queryBus.execute(QUERY_NAMES.GET_POST_BY_ID, postId);
        let updatedLikes;
        const likesArray = post.likes.map((like) =>
            like._id ? like._id.toString() : like.toString()
        );

        if (likesArray.includes(userId)) {
            // User already liked → UNLIKE the post
            updatedLikes = likesArray.filter((id) => id !== userId);
            await eventBus.publish(EVENT_NAMES.UNLIKE_POST, { postId, userId });
        } else {
            // User has not liked yet → LIKE the post
            updatedLikes = [...likesArray, userId];
            await eventBus.publish(EVENT_NAMES.LIKE_POST, { postId, userId });
        }

        res.status(200).json(updatedLikes);
    } catch (error) {
        next(error);
    }
};

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await queryBus.execute(QUERY_NAMES.GET_ALL_POSTS);
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

export const getLikedPosts = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const likedPosts = await queryBus.execute(QUERY_NAMES.GET_LIKED_POSTS, userId);
        res.status(200).json(likedPosts);
    } catch (error) {
        next(error);
    }
};

export const getFollowingPosts = async (req, res, next) => {
    try {
        const followingPosts = await queryBus.execute(
            QUERY_NAMES.GET_FOLLOWING_POSTS,
            req.user.following
        );
        res.status(200).json(followingPosts);
    } catch (error) {
        next(error);
    }
};

export const getUserPosts = async (req, res, next) => {
    try {
        const username = req.params.username;
        const userPosts = await queryBus.execute(QUERY_NAMES.GET_USER_POSTS, username);
        res.status(200).json(userPosts);
    } catch (error) {
        next(error);
    }
};
