import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export class UserRepository {
    async findUserByUsername(username) {
        return User.findOne({ username }).select("-password");
    }

    async findUserById(userId) {
        return User.findById(userId).select("-password");
    }

    async updateUserById(userId, updateData) {
        return User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    }

    async getSuggestedUsers(userId, followingIds) {
        return User.aggregate([
            { $match: { _id: { $ne: userId } } },
            { $sample: { size: 10 } },
            { $project: { password: 0 } },
        ]).then((users) => users.filter((user) => !followingIds.includes(user._id)));
    }

    async followUser(userId, targetUserId) {
        await User.findByIdAndUpdate(targetUserId, { $push: { followers: userId } });
        await User.findByIdAndUpdate(userId, { $push: { following: targetUserId } });
    }

    async unfollowUser(userId, targetUserId) {
        await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } });
        await User.findByIdAndUpdate(userId, { $pull: { following: targetUserId } });
    }

    async createNotification(notificationData) {
        const notification = new Notification(notificationData);
        return notification.save();
    }
}
