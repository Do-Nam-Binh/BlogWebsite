import { generateHexId } from "../../utils/setId.js";
import ReactionEmoji from "../../utils/types/enums/reactions.js";
import Post from "../entity/post.model.js";
import Joi from "joi";

const postCreateValidate = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
  content: Joi.string().required(),
  visibility: Joi.boolean().required(),
  categories: Joi.array().items(Joi.string()).required(),
  tags: Joi.array().items(Joi.string()).required(),
}).unknown(false);

const postEditValidate = Joi.object({
  title: Joi.string().optional(),
  summary: Joi.string().optional(),
  content: Joi.string().optional(),
  visibility: Joi.boolean().optional(),
  likes: Joi.number().optional().min(0),
  categories: Joi.array().items(Joi.string()).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  reactions: Joi.object()
    .pattern(
      Joi.string().valid(...Object.values(ReactionEmoji)), // Emoji keys must be valid
      Joi.number().min(0) // Values must be numbers >= 0
    )
    .optional(),
});

export const createPostService = async (body) => {
  try {
    const { error } = postCreateValidate.validate(body);
    if (error) {
      throw error;
    }

    const { title, summary, content, categories, tags, visibility } = body;

    const newPost = new Post({
      _id: generateHexId("post"),
      title,
      summary,
      content,
      categories,
      tags,
      visibility,
    });

    await newPost.save();

    return newPost;
  } catch (error) {
    throw error;
  }
};

export const editPostService = async (id, body) => {
  try {
    const { error } = postEditValidate.validate(body);
    if (error) {
      throw error;
    }
    const post = await Post.findById(id);
    console.log(post);

    if (!post) {
      throw new Error("Post not found");
    }

    for (const key in body) {
      if (key === "reactions") {
        // Convert enum keys to emoji values
        post.reactions = Object.fromEntries(
          Object.entries(body.reactions).map(([enumKey, count]) => [
            ReactionEnum[enumKey] || enumKey, // Convert only if exists in the enum
            count,
          ])
        );
      } else {
        post[key] = body[key]; // Directly overwrite other fields
      }
    }
    await post.save();

    return post;
  } catch (error) {
    throw error;
  }
};

export const getAllPostService = async () => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts;
  } catch (error) {
    throw error;
  }
};

export const getPostByIdService = async (id) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw error;
  }
};

export const deletePostService = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    throw error;
  }
};

export const hidePostService = async (id) => {
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { visibility: false },
      { new: true }
    );

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    throw error;
  }
};

export const publishPostService = async (id) => {
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { visibility: true },
      { new: true }
    );

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    throw error;
  }
};

export const likePostService = async (id) => {
  try {
    const post = await Post.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    post.likes = post.likes + 1;
    await post.save();

    return post;
  } catch (error) {
    throw error;
  }
};

export const dislikePostService = async (id) => {
  try {
    const post = await Post.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.likes > 0) {
      post.likes = post.likes - 1;
    }

    await post.save();

    return post;
  } catch (error) {
    throw error;
  }
};

export const addReactionService = async (id, body) => {
  try {
    const { reaction } = body;
    if (!Object.keys(ReactionEmoji).includes(reaction)) {
      throw new Error("Invalid emoji reaction");
    }
    const post = await Post.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    post.reactions.set(
      ReactionEmoji[reaction],
      (post.reactions.get(ReactionEmoji[reaction]) || 0) + 1
    );

    await post.save(); // Save the post with the updated reactions

    return post;
  } catch (error) {
    throw error;
  }
};

export const removeReactionService = async (id, body) => {
  try {
    const { reaction } = body;
    if (!Object.keys(ReactionEmoji).includes(reaction)) {
      throw new Error("Invalid emoji reaction");
    }

    const post = await Post.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    const currentCount = post.reactions.get(ReactionEmoji[reaction]) || 0;
    if (currentCount > 0) {
      post.reactions.set(ReactionEmoji[reaction], currentCount - 1);
    }

    await post.save();

    return post;
  } catch (error) {
    throw error;
  }
};
