import mongoose from "mongoose";
import { generateHexId } from "../../utils/setId.js";
import ReactionEmoji from "../../utils/types/enums/reactions.js";

const postSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: generateHexId("post"), // Auto-generate a unique string ID
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
      of: {
        type: Number,
        min: 0, // Ensures reaction counts are non-negative
        default: 0,
      },
      default: {},
      validate: {
        validator: function (reactions) {
          return Object.keys(reactions).every((emoji) =>
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
