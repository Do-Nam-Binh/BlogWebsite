import mongoose from "mongoose";
import { generateHexId } from "../../utils/setId";

const commentSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: generateHexId("comment"), // Auto-generate a unique string ID
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
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
