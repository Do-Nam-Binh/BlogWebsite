import {
  getCommentsFromPost,
  commentPost,
  editComment,
  deleteComment,
  restoreComment
} from "../controller/comment.controller.js";

import express from "express";

const router = express.Router();

router.get("/:postId", getCommentsFromPost);
router.post("/create", commentPost);
router.put("/edit/:id", editComment);
router.delete("/delete/:id", deleteComment);
router.put("/restore/:id", restoreComment);
export default router;
