import React, { useState } from "react";
import CreatePostForm from "./components/createPostForm";

const CreateBlogPost: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const handleSave = () => {
    console.log("Saving Post:", content);
    // Send content to backend
  };

  return (
    <div className="flex flex-col items-center my-20 h-full">
      <div className="w-fit flex flex-col">
        <div className="flex gap-5 self-end mb-3">
          <button
            className="border-1 py-2 px-3 rounded-md"
            onClick={handleSave}
          >
            Save Draft
          </button>
          <button
            className="border-1 py-2 px-3 rounded-md"
            onClick={handleSave}
          >
            Save & Publish
          </button>
        </div>
        <CreatePostForm onChange={setContent} />
      </div>
    </div>
  );
};

export default CreateBlogPost;
