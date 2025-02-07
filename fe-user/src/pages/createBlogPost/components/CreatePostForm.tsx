import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { PostAction, PostState } from "../../../types/Post";
import { useState } from "react";

const availableCategories = [
  "Technology",
  "Health",
  "Education",
  "Business",
  "Science",
];

type CreatePostFormProps = {
  post: PostState;
  dispatch: React.Dispatch<PostAction>;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({ post, dispatch }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handleChange = (value: string, type: PostAction["type"]) => {
    const sanitizedValue = DOMPurify.sanitize(value); // Prevent XSS
    dispatch({ type: type, value: sanitizedValue });
  };

  return (
    <>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="border-1 border-slate-400 rounded-sm py-2 px-4 text-[13px] border-inherit focus:outline-none"
            value={post.title}
            onChange={(e) => {
              handleChange(e.target.value, "TITLE");
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Summary</label>
          <textarea
            className="border-1 border-slate-400 rounded-sm py-2 px-4 text-[13px] border-inherit focus:outline-none max-h-50 min-h-50 resize-none"
            value={post.summary}
            onChange={(e) => {
              handleChange(e.target.value, "SUMMARY");
            }}
          />
        </div>
        <div>
          <label htmlFor="categories">Categories</label>
          <div className="flex gap-2 mt-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border-1 border-slate-400 px-2 py-1 text-[13px] rounded-sm"
            >
              <option value="">Select a category</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleChange(selectedCategory, "ADD_CATEGORY")}
              className="rounded-full border-1 border-slate-400 px-2 hover:border-slate-600 text-[13px]"
            >
              +
            </button>
          </div>
          {/* Display selected categories */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {post.categories.map((category) => (
              <span
                key={category}
                className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded flex items-center"
              >
                {category}
                <button
                  type="button"
                  onClick={() => handleChange(category, "REMOVE_CATEGORY")}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="categories">Tags</label>
          <div className="flex gap-2 mt-1">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border-1 border-slate-400 px-2 py-1 text-[13px] rounded-sm"
            >
              <option value="">Select a tag</option>
              {availableCategories.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handleChange(selectedTag, "ADD_TAG")}
              className="rounded-full border-1 border-slate-400 px-2 hover:border-slate-600 text-[13px]"
            >
              +
            </button>
          </div>
          {/* Display selected tags */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleChange(tag, "REMOVE_TAG")}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="">Content</label>
          <ReactQuill
            className="h-600px overflow-hidden flex-1 rounded-sm  border-slate-300 border-1 overflow-auto" // Use Tailwind for base styling
            theme="snow"
            value={post.content}
            onChange={(value) => {
              handleChange(value, "CONTENT");
            }}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ align: [] }], // Add text alignment options (left, center, right, justify)
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                [{ font: [] }], // Add font selection
                [{ size: ["small", false, "large", "huge"] }], // Add size options
                [{ color: [] }, { background: [] }], // Add text color and background color
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
