import { CircleUser, MessageCircle } from "lucide-react";
import { Comment } from "../../../types/Comment";
import CreateComment from "./CreateComment";
import { useState } from "react";

interface CommentProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* Main Comment */}
      <div className="flex justify-stretch">
        <CircleUser className="w-4 h-4 mt-6.5 mr-2" />
        <div className="flex flex-col w-full">
          <div className="border border-slate-300 rounded-sm p-5">
            <div className="font-bold">{comment.userId?.username}</div>
            <div>
              {comment.deleted ? <i>Comment deleted</i> : comment.content}
            </div>
          </div>
          <a
            className="flex items-center text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            <div>Reply</div>
          </a>
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-2">
          <CreateComment
            postIdInput={comment.postId}
            replyIdInput={comment._id}
          />
        </div>
      )}

      {/* Nested Replies */}
      {comment.children && comment.children.length > 0 && (
        <div className="ml-8 mt-2 border-l border-gray-300 pl-4">
          {comment.children.map((child) => (
            <CommentCard key={child._id} comment={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
