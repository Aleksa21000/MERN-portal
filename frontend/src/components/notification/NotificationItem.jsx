import { Link } from "react-router-dom";
import { FaUser, FaHeart } from "react-icons/fa";

const NotificationItem = ({ notification }) => {
    return (
        <div className="border-b border-gray-700 p-4 flex gap-2">
            {notification.type === "follow" && <FaUser className="w-7 h-7 text-primary" />}
            {notification.type === "like" && <FaHeart className="w-7 h-7 text-red-500" />}

            <Link
                to={`/profile/${notification.from.username}`}
                className="flex flex-col items-start gap-2"
            >
                <div className="avatar">
                    <div className="w-8 h-8 rounded-full">
                        <img src={notification.from.profileImg || "/avatar-placeholder.png"} />
                    </div>
                </div>
                <div className="flex gap-1">
                    <span className="font-bold">@{notification.from.username}</span>
                    {notification.type === "follow" ? "followed you" : "liked your post"}
                </div>
            </Link>
        </div>
    );
};

export default NotificationItem;
