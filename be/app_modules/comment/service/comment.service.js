import Post from "../../post/entity/post.model.js";
import Comment from "../entity/comment.model.js";
import { generateHexId } from "../../utils/setId.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

const commentPostValidate = Joi.object({
  postId: Joi.string().required(),
  content: Joi.string().required(),
  replyId: Joi.string().allow("").optional(),
}).unknown(false);

export const commentPostService = async (req) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>" -> token

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) reject(new Error("Forbidden"));
        resolve(decoded);
      });
    });

    const { error } = commentPostValidate.validate(req.body);
    if (error) {
      throw error;
    }

    const { postId, content, replyId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const newComment = new Comment({
      _id: generateHexId("comment"),
      postId,
      userId: decoded.id,
      content,
      ...(replyId && { replyId }), // Only includes replyId if it's truthy
    });

    await newComment.save();

    const createdComment = await Comment.findById(newComment._id)
      .populate("userId", "username")
      .exec();
    return createdComment;
  } catch (error) {
    throw error;
  }
};

export const editCommentService = async (id, body) => {
  try {
    const { content } = body;
    const comment = await Comment.findByIdAndUpdate(
      id,
      { content: content, edited: true },
      { new: true }
    );
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  } catch (error) {
    throw error;
  }
};

export const deleteCommentService = async (id) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  } catch (error) {
    throw error;
  }
};

export const restoreCommentService = async (id) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { deleted: false },
      { new: true }
    );
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  } catch (error) {
    throw error;
  }
};

export const getCommentsFromPostService = async (postId) => {
  try {
    const comments = await Comment.find({ postId: postId })
      .populate("userId", "username")
      .exec();
    return comments;
  } catch (error) {
    throw error;
  }
};
