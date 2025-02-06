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
router.put("/edit/:id", editPost);
router.delete("/delete/:id", deletePost);
router.put("/hide/:id", hidePost);
router.put("/publish/:id", publishPost);
router.put("/like/:id", likePost);
router.put("/dislike/:id", dislikePost);
router.put("/addReact/:id", addReaction);
router.put("/removeReact/:id", removeReaction);

export default router;
