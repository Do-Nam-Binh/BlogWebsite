import mongoose from "mongoose";
import { generateHexId } from "../../utils/setId";

const allowedReactions = ["👍", "❤️", "😂", "😮", "😢", "👎"];

const postSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: generateHexId("post"), // Auto-generate a unique string ID
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
            allowedReactions.includes(emoji)
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
