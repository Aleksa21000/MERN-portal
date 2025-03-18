import express from "express";
import { logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { queryBus } from "../lib/queryBus.js";

const router = express.Router();

router.get("/me", protectRoute, async (req, res, next) => {
    try {
        const user = await queryBus.execute("GetMe", req.user.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const user = await queryBus.execute("SignupUser", { ...req.body, res });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const user = await queryBus.execute("LoginUser", { ...req.body, res });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.post("/logout", logout);

export default router;
