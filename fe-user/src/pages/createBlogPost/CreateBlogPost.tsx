import React, { useReducer } from "react";
import CreatePostForm from "./components/CreatePostForm";
import { PostState, PostAction } from "../../types/Post";
import { PostBlogApi } from "./CreateBlogPostApi";

const initialPost: PostState = {
  title: "",
  summary: "",
  content: "",
  categories: [],
  tags: [],
};

const postReducer = (state: PostState, action: PostAction) => {
  switch (action.type) {
    case "TITLE":
      return { ...state, title: action.value };
    case "SUMMARY":
      return { ...state, summary: action.value };
    case "CONTENT":
      return { ...state, content: action.value };

    case "ADD_CATEGORY":
      return state.categories.includes(action.value)
        ? state // Return the same state if category exists
        : { ...state, categories: [...state.categories, action.value] };

    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category: string) => category !== action.value
        ),
      };

    case "ADD_TAG":
      return state.tags.includes(action.value)
        ? state // Return the same state if tag exists
        : { ...state, tags: [...state.tags, action.value] };

    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag: string) => tag !== action.value),
      };

    default:
      return state;
  }
};

const CreateBlogPost: React.FC = () => {
  const [post, dispatch] = useReducer(postReducer, initialPost);

  const { error, handleSubmit } = PostBlogApi();

  return (
    <div className="flex flex-col items-center my-20 h-full">
      <div className="w-fit flex flex-col">
        <div className="flex gap-5 self-end mb-3">
          <button
            className="border-1 border-slate-400 rounded-sm py-2 px-3 hover:border-slate-600"
            onClick={(e) => handleSubmit(e, post, false)}
          >
            Save Draft
          </button>
          <button
            className="border-1 border-slate-400 rounded-sm py-2 px-3 hover:border-slate-600"
            onClick={(e) => handleSubmit(e, post, true)}
          >
            Save & Publish
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2 self-end">{error}</p>}

        <CreatePostForm post={post} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default CreateBlogPost;
