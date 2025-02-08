import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true, // Auto-generate a unique string ID
    },

    postId: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    replyId: {
      type: String,
      required: false,
      default: null,
    },

    content: {
      type: String,
      required: true,
    },

    edited: {
      type: Boolean,
      default: false,
      required: false,
    },

    deleted: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
