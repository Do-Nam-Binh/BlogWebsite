import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import CommentCard from "./components/CommentCard";
import { useEffect } from "react";
import { fetchCommentOfPost } from "../../state/comment/commentSlice";

const Comment = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  const { commentsByPost, loading, error } = useSelector(
    (state: RootState) => state.comment
  );

  useEffect(() => {
    dispatch(fetchCommentOfPost(postId));
  }, [dispatch, postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const comments = commentsByPost[postId] || [];
  return (
    <>
      <div className="text-[1.75rem] font-semibold mb-5">Top comments</div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))
      ) : (
        <p>No comments available for this post.</p>
      )}
    </>
  );
};

export default Comment;
