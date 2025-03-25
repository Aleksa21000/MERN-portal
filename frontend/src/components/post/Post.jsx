import { useState } from "react";
import { Link } from "react-router-dom";
import usePostMutations from "../../hooks/usePostMutation";
import CommentModal from "./CommentModal";
import PostActions from "./PostActions";
import { formatPostDate } from "../../utils/date";

const Post = ({ post, authUser }) => {
    const { commentPostMutation } = usePostMutations(post._id);
    const [isCommenting, setIsCommenting] = useState(false);

    const openCommentModal = () => {
        document.getElementById(`comments_modal${post._id}`).showModal();
    };

    const handleCommentPost = (commentText, setCommentText) => {
        setIsCommenting(true);
        commentPostMutation.mutate(commentText, {
            onSuccess: () => {
                setIsCommenting(false);
                setCommentText("");
            },
            onError: () => setIsCommenting(false),
        });
    };

    return (
        <div className="border-b border-gray-700 p-4">
            <div className="flex gap-3">
                <Link
                    to={`/profile/${post.user.username}`}
                    className="avatar w-8 h-8 rounded-full overflow-hidden"
                >
                    <img src={post.user.profileImg || "/avatar-placeholder.png"} alt="Profile" />
                </Link>
                <div className="flex-1 relative">
                    <div className="flex justify-between">
                        <Link
                            to={`/profile/${post.user.username}`}
                            className="flex flex-col md:flex-row gap-1 md:gap-2 items-start md:items-center"
                        >
                            <span className="font-bold">{post.user.fullName}</span>
                            <span className="text-gray-500 text-sm">
                                @{post.user.username} · {formatPostDate(post.createdAt)}
                            </span>
                        </Link>
                    </div>
                    <p className="mt-2">{post.text}</p>
                    {post.img && (
                        <img
                            src={post.img}
                            alt="Post"
                            className="rounded-lg mt-5 w-full object-cover"
                        />
                    )}
                    <PostActions
                        post={post}
                        authUser={authUser}
                        openCommentModal={openCommentModal}
                    />
                </div>
            </div>
            <CommentModal post={post} isCommenting={isCommenting} commentPost={handleCommentPost} />
        </div>
    );
};

export default Post;
