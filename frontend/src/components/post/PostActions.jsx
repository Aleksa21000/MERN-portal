import { FaRegComment, FaRegHeart, FaRegBookmark, FaTrash } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import usePostMutations from "../../hooks/usePostMutation";
import LoadingSpinner from "../ui/LoadingSpinner";

const PostActions = ({ post, authUser, openCommentModal }) => {
    if (!post || !authUser) return null;

    const { deletePostMutation, likePostMutation } = usePostMutations(post?._id);
    const isLiked = post.likes.includes(authUser?._id);
    const isMyPost = authUser && authUser?._id === post.user?._id;

    return (
        <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-full justify-between">
                <div
                    className="flex gap-1 items-center cursor-pointer group"
                    onClick={openCommentModal}
                >
                    <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                    <span className="text-sm text-slate-500 group-hover:text-sky-400">
                        {post.comments?.length || 0}
                    </span>
                </div>
                <div className="flex gap-1 items-center group cursor-pointer">
                    <BiRepost className="w-6 h-6 text-slate-500 group-hover:text-green-500" />
                    <span className="text-sm text-slate-500 group-hover:text-green-500">0</span>
                </div>
                <div
                    className="flex gap-1 items-center group cursor-pointer"
                    onClick={() => likePostMutation.mutate()}
                >
                    {likePostMutation.isPending ? (
                        <LoadingSpinner size="sm" />
                    ) : (
                        <FaRegHeart
                            className={`w-4 h-4 cursor-pointer ${
                                isLiked
                                    ? "text-pink-500"
                                    : "text-slate-500 group-hover:text-pink-500"
                            }`}
                        />
                    )}
                    <span
                        className={`text-sm ${
                            isLiked ? "text-pink-500" : "text-slate-500 group-hover:text-pink-500"
                        }`}
                    >
                        {post.likes?.length || 0}
                    </span>
                </div>
                <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
            </div>
            <div className="absolute top-0 right-0">
                {isMyPost &&
                    (deletePostMutation.isPending ? (
                        <LoadingSpinner size="sm" />
                    ) : (
                        <FaTrash
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => deletePostMutation.mutate(post._id)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default PostActions;
