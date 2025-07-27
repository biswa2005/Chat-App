import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../src/lib/db.js";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on http://localhost:5001");
  connectDB();
});
