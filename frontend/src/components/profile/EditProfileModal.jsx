import { useEffect, useState } from "react";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

const EditProfileModal = ({ authUser }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        bio: "",
        link: "",
        newPassword: "",
        currentPassword: "",
    });

    const { updateProfile, isUpdatingProfile } = useUpdateProfile();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (authUser) {
            setFormData({
                fullName: authUser.fullName || "",
                username: authUser.username || "",
                email: authUser.email || "",
                bio: authUser.bio || "",
                link: authUser.link || "",
                newPassword: "",
                currentPassword: "",
            });
        }
    }, [authUser]);

    return (
        <>
            <button
                className="btn btn-outline rounded-full btn-sm mr-2"
                onClick={() => document.getElementById("edit_profile_modal").showModal()}
            >
                Edit profile
            </button>
            <dialog id="edit_profile_modal" className="modal">
                <div className="modal-box border rounded-md border-gray-700 shadow-md">
                    <h3 className="font-bold text-lg my-3">Update Profile</h3>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateProfile(formData);
                        }}
                    >
                        <div className="flex flex-wrap gap-2">
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={formData.fullName}
                                name="fullName"
                                onChange={handleInputChange}
                                className="border-gray-700"
                            />
                            <Input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                name="username"
                                onChange={handleInputChange}
                                className="border-gray-700"
                            />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                name="email"
                                onChange={handleInputChange}
                                className="border-gray-700"
                            />
                            <Textarea
                                placeholder="Bio"
                                value={formData.bio}
                                name="bio"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Input
                                type="password"
                                placeholder="Current Password"
                                value={formData.currentPassword}
                                name="currentPassword"
                                onChange={handleInputChange}
                                className="border-gray-700"
                            />
                            <Input
                                type="password"
                                placeholder="New Password"
                                value={formData.newPassword}
                                name="newPassword"
                                onChange={handleInputChange}
                                className="border-gray-700"
                            />
                        </div>
                        <Input
                            type="text"
                            placeholder="Link"
                            value={formData.link}
                            name="link"
                            onChange={handleInputChange}
                            className="border-gray-700 w-full"
                        />
                        <Button type="submit" variant="primary">
                            {isUpdatingProfile ? "Loading..." : "Update"}
                        </Button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className="outline-none">close</button>
                </form>
            </dialog>
        </>
    );
};
export default EditProfileModal;
