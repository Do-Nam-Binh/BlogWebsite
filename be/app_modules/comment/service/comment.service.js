import Post from "../../post/entity/post.model.js";
import Comment from "../entity/comment.model.js";
import { generateHexId } from "../../utils/setId.js";
import Joi from "joi";

const commentPostValidate = Joi.object({
  postId: Joi.string().required(),
  userId: Joi.string().required(),
  content: Joi.string().required(),
  replyId: Joi.string().optional(),
}).unknown(false);

export const commentPostService = async (body) => {
  try {
    const { error } = commentPostValidate.validate(body);
    if (error) {
      throw error;
    }

    const { postId, userId, content, replyId } = body;

    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const newComment = new Comment({
      _id: generateHexId("comment"),
      postId,
      userId,
      content,
      ...(replyId && { replyId }), // Only includes replyId if it's truthy
    });

    await newComment.save();

    return newComment;
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
