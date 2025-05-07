import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createDbConnection } from "./src/config/dbconfig.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 7800;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/", authRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    const conn = createDbConnection();
});







