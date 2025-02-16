import { useState } from "react";
import API from "../../../http-call/apiCall";
import { CommentState } from "../../../types/Comment";
import { useAppDispatch } from "../../../state/store";
import { addCommentToState } from "../../../state/comment/commentSlice";

export const useCommentApi = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const handleCreate = async (e: React.FormEvent, comment: CommentState) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post(
        "/api/comment/create",
        { ...comment },
        {
          withCredentials: true,
        }
      );

      dispatch(
        addCommentToState({
          postId: response.data.postId,
          comment: response.data,
        })
      );

      return response.data;
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Comment creation failed");
    }
  };

  return {
    error,
    handleCreate,
  };
};
