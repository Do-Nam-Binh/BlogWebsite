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
router.post("/create", protectRoute(["ADMIN"]), createPost);
router.put("/edit/:id", protectRoute(["ADMIN"]), editPost);
router.delete("/delete/:id", protectRoute(["ADMIN"]), deletePost);
router.put("/hide/:id", protectRoute(["ADMIN"]), hidePost);
router.put("/publish/:id", protectRoute(["ADMIN"]), publishPost);
router.put("/like/:id", likePost);
router.put("/dislike/:id", dislikePost);
router.put("/addReact/:id", addReaction);
router.put("/removeReact/:id", removeReaction);

export default router;
