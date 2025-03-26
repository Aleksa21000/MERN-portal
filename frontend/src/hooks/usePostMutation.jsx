import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, likePost, commentPost } from "../api/postApi";
import toast from "react-hot-toast";

const usePostMutations = (postId) => {
    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            toast.success("Post created successfully!");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => toast.error(error.message),
    });

    const deletePostMutation = useMutation({
        mutationFn: () => deletePost(postId),
        onSuccess: () => {
            toast.success("Post deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
        },
        onError: (error) => toast.error(error.message),
    });

    const likePostMutation = useMutation({
        mutationFn: () => likePost(postId),
        onSuccess: (updatedLikes) => {
            queryClient.setQueryData(["posts"], (oldData) =>
                oldData.map((p) => (p._id === postId ? { ...p, likes: updatedLikes } : p))
            );
        },
        onError: (error) => toast.error(error.message),
    });

    const commentPostMutation = useMutation({
        mutationFn: (commentText) => commentPost(postId, commentText),
        onSuccess: (updatedComments) => {
            toast.success("Comment posted successfully!");
            queryClient.setQueryData(["posts"], (oldData) =>
                oldData.map((p) => (p._id === postId ? { ...p, comments: updatedComments } : p))
            );
        },
        onError: (error) => toast.error(error.message),
    });

    return { createPostMutation, deletePostMutation, likePostMutation, commentPostMutation };
};

export default usePostMutations;
