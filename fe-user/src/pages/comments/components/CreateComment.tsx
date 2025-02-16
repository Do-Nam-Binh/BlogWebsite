import { CircleUser } from "lucide-react";
import { useCreateComment } from "../hooks/useCreateComment";
import { useEffect } from "react";
import { useCommentApi } from "../api-calls/useCommentApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

const CreateComment = ({
  postIdInput,
  replyIdInput,
}: {
  postIdInput: string;
  replyIdInput?: string;
}) => {
  const { handleCreate } = useCommentApi();
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    postId,
    setPostId,
    userId,
    setUserId,
    replyId,
    setReplyId,
    commentContent,
    setCommentContent,
  } = useCreateComment();

  useEffect(() => {
    setPostId(postIdInput);
  }, [postIdInput]);

  useEffect(() => {
    setReplyId(replyIdInput || "");
  }, [replyIdInput]);

  useEffect(() => {
    if (user) {
      setUserId(user.userId || "");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user.userId || "");
    }
  }, [user]); // This will update when user is set in Redux

  return (
    <>
      <div className="grid grid-cols-[35px_1fr]">
        <CircleUser className="w-6 h-6 mt-2" />
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            handleCreate(e, {
              postId,
              userId,
              replyId,
              content: commentContent,
            });
            setCommentContent("");
          }}
        >
          <textarea
            className="border-1 border-slate-300 rounded-sm resize-none w-full min-h-10 p-2"
            placeholder="Add to the discussion"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button className="self-end bg-blue-300 py-1 px-3 rounded-md text-white font-bold hover:bg-sky-300">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateComment;
