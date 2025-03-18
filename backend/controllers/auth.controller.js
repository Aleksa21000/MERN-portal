import { queryBus } from "../lib/queryBus.js";

export const signup = async (req, res) => {
    try {
        const user = await queryBus.execute("SignupUser", { ...req.body, res });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const user = await queryBus.execute("LoginUser", { ...req.body, res });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await queryBus.dispatch("GetMe", req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
