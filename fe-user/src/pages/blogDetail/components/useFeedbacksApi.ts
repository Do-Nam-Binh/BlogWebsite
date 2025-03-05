import API from "../../../http-call/apiCall";
import { useAppDispatch } from "../../../state/store";
import {
  likePost,
  dislikePost,
  addReaction,
} from "../../../state/post/postSlice";
// import { Emoji } from "../../../types/Emoji";

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

  const handleAddReact = async (postId: string, key: string, emoji: string) => {
    try {
      const response = await API.put(`/api/post/addReact/${postId}`, {
        reaction: key,
      });

      if (response.status === 200) {
        dispatch(
          addReaction({
            postId: postId,
            emoji: emoji,
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
    handleAddReact,
  };
};

export default useFeedbacksApi;
