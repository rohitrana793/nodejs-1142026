import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authRoutes from "./routes/auth.js";
import connectDB from "./database.js";
import logger from "./middlewares/logger.js";
import productRoutes from "./routes/products.js";

const app = express();

dotenv.config();

connectDB();

const appUrls = process.env.APP_URLS;

const appUrlList = appUrls.split(",");
// console.log(appUrls);

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

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    appName: "Node app",
    version: "1.1.0",
    port: PORT,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
