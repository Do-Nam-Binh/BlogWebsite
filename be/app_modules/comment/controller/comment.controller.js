import {
  commentPostService,
  deleteCommentService,
  editCommentService,
  getCommentsFromPostService,
  restoreCommentService,
} from "../service/comment.service.js";

export const commentPost = async (req, res) => {
  try {
    const newComment = await commentPostService(req);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const newComment = await editCommentService(req.params.id, req.body);
    res.status(200).json({ msg: "Comment edited", comment: newComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await deleteCommentService(req.params.id);
    res.status(200).json({ msg: "Comment deleted", comment: comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const restoreComment = async (req, res) => {
  try {
    const comment = await restoreCommentService(req.params.id);
    res.status(200).json({ msg: "Comment restored", comment: comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCommentsFromPost = async (req, res) => {
  try {
    const comments = await getCommentsFromPostService(req.params.postId);
    res.status(200).json({
      msg: `Comments of post ${req.params.postId}`,
      comments: comments,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
