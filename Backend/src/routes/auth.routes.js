import express from "express";
import { signup, login, logout, checkAuth } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", authMiddleware, updateProfile);
router.get("/check", authMiddleware, checkAuth);

export default router;
