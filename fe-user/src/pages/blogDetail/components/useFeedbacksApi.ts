import API from "../../../http-call/apiCall";
import { useAppDispatch } from "../../../state/store";
import { likePost, dislikePost } from "../../../state/post/postSlice";

const useFeedbacksApi = () => {
  const dispatch = useAppDispatch();
  const handleLike = async (postId: string) => {
    try {
      const response = await API.put(`/api/post/like/${postId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(
          likePost({
            postId: postId,
          })
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleDislike = async (postId: string) => {
    try {
      const response = await API.put(`/api/post/dislike/${postId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(
          dislikePost({
            postId: postId,
          })
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return {
    handleLike,
    handleDislike,
  };
};

export default useFeedbacksApi;
