import express from "express";

import {
  signup,
  login,
  logout,
  refreshAccessToken,
} from "../controller/account.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshAccessToken);

export default router;
