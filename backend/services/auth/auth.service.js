import bcrypt from "bcryptjs";
import { AuthRepository } from "../../repository/auth.repository.js";
import { generateTokenAndSetCookie } from "../../lib/utils/generateToken.js";

const authRepository = new AuthRepository();

export class AuthService {
    async signup({ fullName, username, email, password }, res) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^/s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }

        const existingUser = await authRepository.findUserByUsername(username);
        if (existingUser) {
            throw new Error("Username is already taken");
        }

        const existingEmail = await authRepository.findUserByEmail(email);
        if (existingEmail) {
            throw new Error("Email is already taken");
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long");
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await authRepository.createUser({
            fullName,
            username,
            email,
            password: hashedPassword,
        });

        generateTokenAndSetCookie(newUser._id, res);
        return {
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileimg: newUser.profileImg,
            coverimg: newUser.coverImg,
        };
    }

    async login({ username, password }, res) {
        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        const user = await authRepository.findUserByUsername(username);
        if (!user) {
            throw new Error("Invalid Username or Password");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid Username or Password");
        }

        generateTokenAndSetCookie(user._id, res);
        return {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileimg: user.profileImg,
            coverimg: user.coverImg,
        };
    }

    async getMe(userId) {
        return await authRepository.findUserById(userId);
    }
}
