import { queryBus } from "../lib/queryBus.js";
import { QUERY_NAMES } from "../lib/utils/queryNames.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res, next) => {
    try {
        const user = await queryBus.execute(QUERY_NAMES.SIGNUP_USER, req.body);
        generateTokenAndSetCookie(user._id, res);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await queryBus.execute(QUERY_NAMES.LOGIN_USER, req.body);
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await queryBus.execute(QUERY_NAMES.GET_ME, req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};
