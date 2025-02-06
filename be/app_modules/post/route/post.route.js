import { protectRoute } from "../../utils/middleware/protectedRoute.js";
import {
  createPost,
  editPost,
  getAllPost,
  getPostById,
  deletePost,
  hidePost,
  publishPost,
  likePost,
  dislikePost,
  addReaction,
  removeReaction,
} from "../controller/post.controller.js";
import express from "express";

const router = express.Router();

router.get("/all", getAllPost);
router.get("/get/:id", getPostById);
router.post("/create", createPost);
router.post("/edit/:id", editPost);
router.delete("/delete/:id", deletePost);
router.post("/hide/:id", hidePost);
router.post("/publish/:id", publishPost);
router.post("/like/:id", likePost);
router.post("/dislike/:id", dislikePost);
router.post("/addReact/:id", addReaction);
router.post("/removeReact/:id", removeReaction);

export default router;
