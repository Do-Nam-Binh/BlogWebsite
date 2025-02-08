import mongoose from "mongoose";
import ReactionEmoji from "../../utils/types/enums/reactions.js";

const postSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true, // Auto-generate a unique string ID
    },

    title: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    categories: {
      type: Array,
      required: true,
    },

    tags: {
      type: Array,
      required: false,
      default: null,
    },

    visibility: {
      type: Boolean,
      default: false,
    },

    likes: {
      type: Number,
      default: 0,
    },

    reactions: {
      type: Map,
      of: Number,
      default: {},
      validate: {
        validator: function (reactions) {
          return [...reactions.keys()].every((emoji) =>
            Object.values(ReactionEmoji).includes(emoji)
          );
        },
        message: (props) => `${props.value} contains invalid emojis!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
