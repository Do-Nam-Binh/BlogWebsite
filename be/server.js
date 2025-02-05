import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import accountRoutes from "./app_modules/account/route/account.route.js";
import postRoutes from "./app_modules/post/route/post.route.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import passport from "passport";
import session from "express-session";
import googleOauth from "passport-google-oauth20";

const allowedOrigins = ["http://localhost:5173"];
dotenv.config();

const GoogleStrategy = googleOauth.Strategy;
const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Enable cookies and other credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/account/google/callback",
    },
    (accessToken, refreshAccessToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.options("*", cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json({ limit: "5mb" })); // This middleware parses req.body for JSON data

app.use(cookieParser());

app.use("/api/account", accountRoutes);
app.use("/api/post", postRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Database connected successfully!");
  console.log(`Server started at http://localhost:${PORT}`);
  connectMongoDB(); // Ensure MongoDB connection is established
});
