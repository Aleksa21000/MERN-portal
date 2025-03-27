import { Link } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/Button";

const SuggestedUser = ({ user, follow, isPending }) => {
    return (
        <Link to={`/profile/${user?.username}`} className="flex items-center justify-between gap-4">
            <div className="flex gap-2 items-center">
                <div className="avatar">
                    <div className="w-8 h-8 rounded-full">
                        <img src={user?.profileImg || "/avatar-placeholder.png"} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                        {user?.fullName}
                    </span>
                    <span className="text-sm text-slate-500">@{user?.username}</span>
                </div>
            </div>
            <div>
                <Button
                    type="submit"
                    variant="secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        follow(user?._id);
                    }}
                >
                    {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                </Button>
            </div>
        </Link>
    );
};

export default SuggestedUser;
