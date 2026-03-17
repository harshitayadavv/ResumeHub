import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import customizeRoutes from "./routes/customizeRoutes.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - MUST be before all routes
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5173",
  "https://resume-hub-rho.vercel.app"  // ✅ ADD THIS
];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// Start server after connecting to MongoDB
(async () => {
  try {
    await connectDB();

    // Test Route
    app.get("/", (req, res) => {
      res.send("ResumeHub Backend is working");
    });

    // Test auth
    app.get("/api/test", (req, res) => {
      res.json({ message: "Server is working" });
    });

    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/uploads", express.static("uploads"));
    app.use("/api/resume", protect, resumeRoutes);
    app.use("/api/customize-resume", protect, customizeRoutes);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
