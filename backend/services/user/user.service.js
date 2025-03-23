import { UserRepository } from "../../repository/user.repository.js";

const userRepository = new UserRepository();

export class UserService {
    async getUserProfile(username) {
        const user = await userRepository.findUserByUsername(username);
        if (!user) throw new Error("User not found");
        return user;
    }

    async getSuggestedUsers(userId) {
        const currentUser = await userRepository.findUserById(userId);
        const suggestedUsers = await userRepository.getSuggestedUsers(
            userId,
            currentUser.following
        );
        return suggestedUsers.slice(0, 4);
    }
}
