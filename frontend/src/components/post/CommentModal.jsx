import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

const CommentModal = ({ post, isCommenting, commentPost }) => {
    const [comment, setComment] = useState("");

    const handlePostComment = (e) => {
        e.preventDefault();
        if (!comment.trim() || isCommenting) return;
        commentPost(comment, setComment);
    };

    return (
        <dialog id={`comments_modal${post._id}`} className="modal border-none outline-none">
            <div className="modal-box rounded border border-gray-600">
                <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                        <p className="text-sm text-slate-500">
                            No comments yet 🤔 Be the first one 😉
                        </p>
                    )}
                    {post.comments.map((comment) => (
                        <div key={comment._id} className="flex gap-2 items-start">
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img
                                        src={comment.user.profileImg || "/avatar-placeholder.png"}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <span className="font-bold">{comment.user.fullName}</span>
                                    <span className="text-gray-700 text-sm">
                                        @{comment.user.username}
                                    </span>
                                </div>
                                <div className="text-sm">{comment.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                >
                    <Textarea
                        name="comment"
                        value={comment}
                        className="border border-gray-800"
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                    />
                    <Button type="submit" variant="primary">
                        {isCommenting ? <LoadingSpinner size="md" /> : "Post"}
                    </Button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className="outline-none">close</button>
            </form>
        </dialog>
    );
};

export default CommentModal;
