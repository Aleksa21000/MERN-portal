import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import useFollow from "../../hooks/useFollow";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import useProfile from "../../hooks/useProfile";

import Posts from "../../components/post/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";

import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileActions from "../../components/profile/ProfileActions";
import ProfileStatus from "../../components/profile/ProfileStatus";

import { FaArrowLeft } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
    const [coverImg, setCoverImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [feedType, setFeedType] = useState("posts");
    const { username } = useParams();
    const coverImgRef = useRef(null);
    const profileImgRef = useRef(null);

    const { user, userPosts, isLoading, isRefetching, refetch, authUser } = useProfile(username);
    const { follow, isPending } = useFollow();
    const { updateProfile, isUpdatingProfile } = useUpdateProfile();

    const isMyProfile = authUser._id === user?._id;
    const followingUser = authUser?.following.includes(user?._id);

    const handleImgChange = (e, state) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                state === "coverImg" && setCoverImg(reader.result);
                state === "profileImg" && setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        refetch();
    }, [username, refetch]);

    return (
        <>
            <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
                {/* HEADER */}
                {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
                {!isLoading && !isRefetching && !user && (
                    <p className="text-center text-lg mt-4">User not found</p>
                )}
                <div className="flex flex-col">
                    {!isLoading && !isRefetching && user && (
                        <>
                            <div className="flex gap-10 px-4 py-2 items-center">
                                <Link to="/">
                                    <FaArrowLeft className="w-4 h-4" />
                                </Link>
                                <div className="flex flex-col">
                                    <p className="font-bold text-lg">{user?.fullName}</p>
                                    <span className="text-sm text-slate-500">
                                        {userPosts?.length || 0} posts
                                    </span>
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
                                        <img
                                            src={
                                                profileImg ||
                                                user?.profileImg ||
                                                "/avatar-placeholder.png"
                                            }
                                        />
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
                            <ProfileActions
                                isMyProfile={isMyProfile}
                                followingUser={followingUser}
                                follow={follow}
                                userId={user?._id}
                                isPending={isPending}
                                coverImg={coverImg}
                                setCoverImg={setCoverImg}
                                profileImg={profileImg}
                                setProfileImg={setProfileImg}
                                updateProfile={updateProfile}
                                isUpdatingProfile={isUpdatingProfile}
                            />
                            <ProfileInfo user={user} />
                            <ProfileStatus feedType={feedType} setFeedType={setFeedType} />
                        </>
                    )}

                    <Posts
                        feedType={feedType}
                        username={username}
                        userId={user?._id}
                        authUser={authUser}
                    />
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
