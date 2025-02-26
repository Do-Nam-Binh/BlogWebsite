import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import accountRoutes from "./app_modules/account/route/account.route.js";
import postRoutes from "./app_modules/post/route/post.route.js";
import commentRoute from "./app_modules/comment/route/comment.route.js";
import imageRoute from "./app_modules/account/route/image.route.js";
import projectRoute from "./app_modules/project/route/project.route.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json({ limit: "5mb" })); // This middleware parses req.body for JSON data

app.use(cookieParser());

app.use("/api/account", accountRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoute);
app.use("/api/image", imageRoute);
app.use("/api/projects", projectRoute);

export default app;
