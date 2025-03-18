import User from "../models/user.model.js";

export class AuthRepository {
    async findUserByUsername(username) {
        return await User.findOne({ username });
    }

    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async createUser(userData) {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    }

    async findUserById(userId) {
        return await User.findById(userId).select("-password");
    }
}
