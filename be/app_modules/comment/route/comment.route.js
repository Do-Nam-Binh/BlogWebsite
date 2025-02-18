import { protectRoute } from "../../utils/middleware/protectedRoute.js";
import {
  getCommentsFromPost,
  commentPost,
  editComment,
  deleteComment,
  restoreComment,
} from "../controller/comment.controller.js";

import express from "express";

const router = express.Router();

router.get("/:postId", getCommentsFromPost);
router.post("/create", protectRoute(["USER", "ADMIN"]), commentPost);
router.put("/edit/:id", protectRoute(["USER", "ADMIN"]), editComment);
router.delete("/delete/:id", protectRoute(["USER", "ADMIN"]), deleteComment);
router.put("/restore/:id", protectRoute(["USER", "ADMIN"]), restoreComment);
export default router;
