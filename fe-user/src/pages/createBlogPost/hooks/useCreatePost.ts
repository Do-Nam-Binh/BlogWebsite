import { PostState, PostAction } from "../../../types/Post";
import { useReducer, useState } from "react";
import { Tags } from "../../../types/Tags";
import { Category } from "../../../types/Categories";
import DOMPurify from "dompurify";

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

export const useCreatePost = () => {
  const [post, dispatch] = useReducer(postReducer, initialPost);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const categoriesOptions = Object.values(Category);
  const tagsOptions = Object.values(Tags);

  const sanitizeInput = (value: string) => {
    return DOMPurify.sanitize(value);
  };

  const handleTitleChange = (value: string) => {
    dispatch({ type: "TITLE", value: sanitizeInput(value) });
  };

  const handleSummaryChange = (value: string) => {
    dispatch({ type: "SUMMARY", value: sanitizeInput(value) });
  };

  const handleContentChange = (value: string) => {
    dispatch({ type: "CONTENT", value: sanitizeInput(value) });
  };

  const handleAddCategory = (value: string) => {
    dispatch({ type: "ADD_CATEGORY", value: sanitizeInput(value) });
  };

  const handleRemoveCategory = (value: string) => {
    dispatch({ type: "REMOVE_CATEGORY", value: sanitizeInput(value) });
  };

  const handleAddTag = (value: string) => {
    dispatch({ type: "ADD_TAG", value: sanitizeInput(value) });
  };

  const handleRemoveTag = (value: string) => {
    dispatch({ type: "REMOVE_TAG", value: sanitizeInput(value) });
  };

  return {
    post,
    handleTitleChange,
    handleSummaryChange,
    handleContentChange,
    handleAddCategory,
    handleRemoveCategory,
    handleAddTag,
    handleRemoveTag,
    selectedCategory,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    categoriesOptions,
    tagsOptions,
  };
};
