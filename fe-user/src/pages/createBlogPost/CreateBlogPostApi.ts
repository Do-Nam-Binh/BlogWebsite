import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../http-call/apiCall";
import { PostState } from "../../types/Post";

export const usePostApi = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (
    e: React.FormEvent,
    post: PostState,
    visibility: boolean
  ) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post(
        "/api/post/create",
        { ...post, visibility: visibility },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Post creation failed");
    }
  };

  return {
    error,
    handleSubmit,
  };
};
