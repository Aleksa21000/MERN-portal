import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { UserRepository } from "../../repository/user.repository.js";

const userRepository = new UserRepository();

export class UserProfileService {
    async updateUser(userId, updateData) {
        const {
            fullName,
            email,
            username,
            currentPassword,
            newPassword,
            bio,
            link,
            profileImg,
            coverImg,
        } = updateData;

        const user = await userRepository.findUserById(userId);
        if (!user) throw new Error("User not found");

        if ((!newPassword && currentPassword) || (newPassword && !currentPassword)) {
            throw new Error("Please provide both current and new passwords");
        }

        if (currentPassword && newPassword) {
            const isPassMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isPassMatch) throw new Error("Incorrect current password");
            if (newPassword.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if (profileImg) {
            user.profileImg = await this.uploadImage(user.profileImg, profileImg);
        }

        if (coverImg) {
            user.coverImg = await this.uploadImage(user.coverImg, coverImg);
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;

        await user.save();
        user.password = null;
        return user;
    }

    async uploadImage(existingImgUrl, newImg) {
        if (existingImgUrl) {
            const existingImgId = existingImgUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(existingImgId);
        }

        const uploadedResponse = await cloudinary.uploader.upload(newImg);
        return uploadedResponse.secure_url;
    }
}
