import EditProfileModal from "./EditProfileModal";
import Button from "../ui/Button";

const ProfileActions = ({
    isMyProfile,
    followingUser,
    follow,
    userId,
    isPending,
    coverImg,
    setCoverImg,
    profileImg,
    setProfileImg,
    updateProfile,
    isUpdatingProfile,
    authUser,
}) => {
    const updateProfileData = async () => {
        await updateProfile({ coverImg, profileImg });
        setProfileImg(null);
        setCoverImg(null);
    };

    return (
        <div className="flex justify-end px-4 mt-5">
            {isMyProfile ? (
                <EditProfileModal authUser={authUser} />
            ) : (
                <Button type="submit" variant="primary" onClick={() => follow(userId)}>
                    {isPending ? "Loading..." : followingUser ? "Unfollow" : "Follow"}
                </Button>
            )}
            {(coverImg || profileImg) && (
                <Button type="submit" variant="primary" onClick={updateProfileData}>
                    {isUpdatingProfile ? "Loading..." : "Update"}
                </Button>
            )}
        </div>
    );
};

export default ProfileActions;
