import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import accountRoutes from "./app_modules/account/route/account.route.js";
import postRoutes from "./app_modules/post/route/post.route.js";
import commentRoute from "./app_modules/comment/route/comment.route.js";
import dotenv from "dotenv";

const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-website-six-pink.vercel.app",
];
dotenv.config();

const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Enable cookies and other credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.options("*", cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json({ limit: "5mb" })); // This middleware parses req.body for JSON data

app.use(cookieParser());

app.use("/api/account", accountRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoute);

export default app;
