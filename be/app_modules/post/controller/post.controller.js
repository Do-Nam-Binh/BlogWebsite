import {
  addReactionService,
  createPostService,
  deletePostService,
  getAllPostService,
  getPostByIdService,
  hidePostService,
  likePostService,
  publishPostService,
  removeReactionService,
} from "../service/post.service.js";

export const createPost = async (req, res) => {
  try {
    const newPost = await createPostService(req.body);
    res.status(200).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const editedPost = await createPostService(req.body);
    res.status(200).json({ message: "Post edited", post: editedPost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await getAllPostService();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await getPostByIdService(req.params.id);
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await deletePostService(req.params.id);
    res
      .status(200)
      .json({ message: `Post ${req.params.id} deleted successfully`, post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const hidePost = async (req, res) => {
  try {
    const post = await hidePostService(req.params.id);
    res.status(200).json({ message: "Post hidden successfully", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const publishPost = async (req, res) => {
  try {
    const post = await publishPostService(req.params.id);
    res.status(200).json({ message: "Post published successfully", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await likePostService(req.params.id);
    res.status(200).json({ message: "Post liked", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const post = await likePostService(req.params.id);
    res.status(200).json({ message: "Post disliked", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addReaction = async (req, res) => {
  try {
    const post = await addReactionService(req.params.id, req.body.reaction);
    res.status(200).json({
      message: `Post reacted with ${req.body.reaction}`,
      post,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeReaction = async (req, res) => {
  try {
    const post = await removeReactionService(req.params.id, req.body.reaction);
    res
      .status(200)
      .json({ message: `Post reaction removed ${req.body.reaction}`, post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
