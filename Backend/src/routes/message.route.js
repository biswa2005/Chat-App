import { authMiddleware } from "../middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get("./users", authMiddleware, UsersList);
router.get("./:id", authMiddleware, getMessages);
router.post("./send/:id", authMiddleware, sendMessages);

export default router;
