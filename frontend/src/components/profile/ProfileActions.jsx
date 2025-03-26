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
    return (
        <div className="flex justify-end px-4 mt-5">
            {isMyProfile ? (
                <EditProfileModal authUser={authUser} />
            ) : (
                <Button
                    className="btn btn-outline rounded-full btn-sm"
                    onClick={() => follow(userId)}
                >
                    {isPending ? "Loading..." : followingUser ? "Unfollow" : "Follow"}
                </Button>
            )}
            {(coverImg || profileImg) && (
                <button
                    className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
                    onClick={async () => {
                        await updateProfile({ coverImg, profileImg });
                        setProfileImg(null);
                        setCoverImg(null);
                    }}
                >
                    {isUpdatingProfile ? "Loading..." : "Update"}
                </button>
            )}
        </div>
    );
};

export default ProfileActions;
