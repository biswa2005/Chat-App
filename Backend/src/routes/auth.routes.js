import express from "express";
import { signup, login, logout } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/user.controllers.js";


const router = express.Router();

router.post("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);
router.put('./update', authMiddleware, updateProfile);

export default router;
