import React from "react";
import CreatePostForm from "./components/CreatePostForm";
import { usePostApi } from "./CreateBlogPostApi";
import { useCreatePost } from "./hooks/useCreatePost";

const CreateBlogPost: React.FC = () => {
  const { error, handleSubmit } = usePostApi();
  const postState = useCreatePost();

  return (
    <div className="flex flex-col items-center my-10 h-full">
      <div className="w-fit flex flex-col">
        <div className="flex gap-5 self-end mb-3">
          <button
            className="border-1 border-slate-400 rounded-sm py-2 px-3 hover:border-slate-600"
            onClick={(e) => handleSubmit(e, postState.post, false)}
          >
            Save Draft
          </button>
          <button
            className="border-1 border-slate-400 rounded-sm py-2 px-3 hover:border-slate-600"
            onClick={(e) => handleSubmit(e, postState.post, true)}
          >
            Save & Publish
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2 self-end">{error}</p>}

        <CreatePostForm {...postState} />
      </div>
    </div>
  );
};

export default CreateBlogPost;
