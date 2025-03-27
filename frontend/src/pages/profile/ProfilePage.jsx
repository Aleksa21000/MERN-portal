import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import useFollow from "../../hooks/useFollow";
import useUpdateProfile from "../../hooks/useUpdateProfile";

import { fetchUserProfile, fetchUserPosts } from "../../api/userApi";

import Posts from "../../components/post/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileActions from "../../components/profile/ProfileActions";
import ProfileStatus from "../../components/profile/ProfileStatus";

const ProfilePage = () => {
    const [coverImg, setCoverImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [feedType, setFeedType] = useState("posts");
    const { username } = useParams();

    const queryClient = useQueryClient();
    const authUser = queryClient.getQueryData(["authUser"]);

    const {
        data: user,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery({
        queryKey: ["userProfile", username],
        queryFn: () => fetchUserProfile(username),
    });

    const { data: userPosts } = useQuery({
        queryKey: ["userPosts", username],
        queryFn: () => fetchUserPosts(username),
    });

    const { follow, isPending } = useFollow();
    const { updateProfile, isUpdatingProfile } = useUpdateProfile();

    const isMyProfile = authUser?._id === user?._id;
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

    const userFound = !isLoading && !isRefetching && user;
    const userNotFound = () => {
        if (!isLoading && !isRefetching && !user)
            return <p className="text-center text-lg mt-4">User not found</p>;
    };

    useEffect(() => {
        refetch();
    }, [username, refetch]);

    return (
        <>
            <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
                {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
                {userNotFound()}
                <div className="flex flex-col">
                    {userFound && (
                        <>
                            <ProfileHeader
                                user={user}
                                userPosts={userPosts}
                                coverImg={coverImg}
                                profileImg={profileImg}
                                handleImgChange={handleImgChange}
                                isMyProfile={isMyProfile}
                                Link={Link}
                            />
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
                                authUser={authUser}
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
