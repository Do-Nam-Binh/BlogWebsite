import express from "express";

import {
  signup,
  login,
  logout,
  refreshAccessToken,
  uploadProfileImg,
} from "../controller/account.controller.js";

import { protectRoute } from "../../utils/middleware/protectedRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshAccessToken);

router.post(
  "/add-profile-img",
  protectRoute(["USER", "ADMIN"]),
  uploadProfileImg
);

export default router;
