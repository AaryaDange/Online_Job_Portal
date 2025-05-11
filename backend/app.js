import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createDbConnection } from "./src/config/dbconfig.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js"
import feedbackRoutes from "./routes/feedbackRoutes.js"

const app = express();      //  instance of an Express app
const PORT = 7800;

// Middleware
app.use(express.json());        // parse incoming JSON requests into JavaScript
app.use(cookieParser());        // Enables cookie parsing on incoming requests.



// Configures CORS to allow requests from frontend apps
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));




// Routes
app.use("/", authRoutes);
app.use("/", jobRoutes);
app.use("/", feedbackRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    const conn = createDbConnection();
});







