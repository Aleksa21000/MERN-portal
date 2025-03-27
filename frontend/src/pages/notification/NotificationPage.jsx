import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotifications, deleteAllNotifications } from "../../api/notificationApi";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import NotificationItem from "../../components/notification/NotificationItem";
import { IoSettingsOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const NotificationPage = () => {
    const queryClient = useQueryClient();

    const { data: notifications, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: fetchNotifications,
    });

    const { mutate: deleteNotifications } = useMutation({
        mutationFn: deleteAllNotifications,
        onSuccess: () => {
            toast.success("Notifications deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <p className="font-bold">Notifications</p>
                {notifications?.length > 0 && (
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="m-1">
                            <IoSettingsOutline className="w-4" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-box w-52"
                        >
                            <li>
                                <a onClick={deleteNotifications}>Delete all notifications</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {isLoading && (
                <div className="flex justify-center h-full items-center">
                    <LoadingSpinner size="lg" />
                </div>
            )}
            {notifications?.length === 0 && (
                <div className="text-center p-4 font-bold">No notifications 🤔</div>
            )}

            {notifications?.map((notification) => (
                <NotificationItem key={notification._id} notification={notification} />
            ))}
        </div>
    );
};

export default NotificationPage;
