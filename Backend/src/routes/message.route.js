import { authMiddleware } from "../middlewares/auth.middleware.js";
import { UsersList, getMessages, sendMessages } from "../controllers/message.controller.js";
import express from "express";

const router = express.Router();

router.get("./users", authMiddleware, UsersList);
router.get("./:id", authMiddleware, getMessages);
router.post("./send/:id", authMiddleware, sendMessages);

export default router;
