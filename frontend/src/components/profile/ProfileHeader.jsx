import { useRef } from "react";

import { FaArrowLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const ProfileHeader = ({
    user,
    userPosts,
    coverImg,
    profileImg,
    handleImgChange,
    isMyProfile,
    Link,
}) => {
    const coverImgRef = useRef(null);
    const profileImgRef = useRef(null);

    return (
        <>
            <div className="flex gap-10 px-4 py-2 items-center">
                <Link to="/">
                    <FaArrowLeft className="w-4 h-4" />
                </Link>
                <div className="flex flex-col">
                    <p className="font-bold text-lg">{user?.fullName}</p>
                    <span className="text-sm text-slate-500">{userPosts?.length || 0} posts</span>
                </div>
            </div>

            {/* COVER IMG */}
            <div className="relative group/cover">
                <img
                    src={coverImg || user?.coverImg || "/cover.png"}
                    className="h-52 w-full object-cover"
                    alt="cover image"
                />
                {isMyProfile && (
                    <div
                        className="absolute top-2 right-2 rounded-full p-2 
                            bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 
                            group-hover/cover:opacity-100 transition duration-200"
                        onClick={() => coverImgRef.current.click()}
                    >
                        <MdEdit className="w-5 h-5 text-white" />
                    </div>
                )}

                <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={coverImgRef}
                    onChange={(e) => handleImgChange(e, "coverImg")}
                />
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={profileImgRef}
                    onChange={(e) => handleImgChange(e, "profileImg")}
                />

                {/* USER AVATAR */}
                <div className="avatar absolute -bottom-16 left-4">
                    <div className="w-32 rounded-full relative group/avatar">
                        <img src={profileImg || user?.profileImg || "/avatar-placeholder.png"} />
                        <div
                            className="absolute top-5 right-3 p-1 
                                bg-primary rounded-full 
                                group-hover/avatar:opacity-100 
                                opacity-0 cursor-pointer"
                        >
                            {isMyProfile && (
                                <MdEdit
                                    className="w-4 h-4 text-white"
                                    onClick={() => profileImgRef.current.click()}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
