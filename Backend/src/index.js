import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "../src/lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "../src/routes/message.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("./api/messaages", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on http://localhost:5001");
  connectDB();
});
