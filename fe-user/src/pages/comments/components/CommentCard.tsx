import { CircleUser, MessageCircle } from "lucide-react";
import { Comment } from "../../../types/Comment";

interface CommentProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentProps> = ({ comment }) => {
  return (
    <>
      <div className="flex justify-stretch">
        <CircleUser className="w-4 h-4 mt-6.5 mr-2" />
        <div className="flex flex-col w-full">
          <div className="border-1 border-slate-300 rounded-sm p-5">
            <div>{comment.userId?.username}</div>

            <div>{comment.content}</div>
          </div>
          <a className="flex items-center">
            <MessageCircle className="w-4 h-4" />
            <div>Reply</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
