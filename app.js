import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authRoutes from "./routes/auth.js";
import connectDB from "./database.js";
import logger from "./middlewares/logger.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

const appUrls = process.env.APP_URLS || "";
const appUrlList = appUrls
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);
app.use(cookieParser());

app.use(
  cors({
    origin: appUrlList,
    credentials: true,
  }),
);

// Connect to MongoDB
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    appName: "Node app",
    version: "1.1.0",
    message: "Backend is running",
  });
});

export default app;
