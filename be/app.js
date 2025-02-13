import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import accountRoutes from "./app_modules/account/route/account.route.js";
import postRoutes from "./app_modules/post/route/post.route.js";
import commentRoute from "./app_modules/comment/route/comment.route.js";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

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

export default app;
