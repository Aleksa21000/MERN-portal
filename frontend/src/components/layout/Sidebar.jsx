import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../api/userApi";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import LogoSvg from "../ui/LogoSvg";
import SidebarItem from "./SidebarItem";
import toast from "react-hot-toast";

const Sidebar = ({ authUser }) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        onError: () => toast.error("Logout failed"),
    });

    if (!authUser) return null;

    return (
        <div className="md:flex-[2_2_0] max-w-52 mobile-60">
            <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full mobile-60">
                <Link to="/" className="flex justify-center md:justify-start">
                    <LogoSvg className="px-2 w-12 h-12 mt-2 fill-white" />
                </Link>
                <ul className="flex flex-col gap-3 mt-4">
                    <SidebarItem to="/" icon={<MdHomeFilled />} label="Home" />
                    <SidebarItem
                        to="/notifications"
                        icon={<IoNotifications />}
                        label="Notifications"
                    />
                    <SidebarItem
                        to={`/profile/${authUser?.username}`}
                        icon={<FaUser />}
                        label="Profile"
                    />
                </ul>
                {authUser && (
                    <Link
                        to={`/profile/${authUser?.username}`}
                        className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-secondary py-2 px-4 rounded-full"
                    >
                        <div className="avatar hidden md:inline-flex">
                            <div className="w-8 rounded-full">
                                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
                            </div>
                        </div>
                        <div className="flex justify-between flex-1 mobile-center">
                            <div className="hidden md:block">
                                <p className="text-white font-bold text-sm w-20 truncate">
                                    {authUser?.fullName}
                                </p>
                                <p className="text-slate-500 text-sm">@{authUser?.username}</p>
                            </div>
                            <BiLogOut className="w-5 h-5 cursor-pointer" onClick={mutate} />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
