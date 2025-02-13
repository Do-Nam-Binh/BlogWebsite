import { useState } from "react";

export const useCreateComment = () => {
  const [postId, setPostId] = useState("");
  const [userId, setUserId] = useState("");
  const [replyId, setReplyId] = useState("");
  const [commentContent, setCommentContent] = useState("");


  return {
    postId,
    setPostId,
    userId,
    setUserId,
    replyId,
    setReplyId,
    commentContent,
    setCommentContent,
  };
};
