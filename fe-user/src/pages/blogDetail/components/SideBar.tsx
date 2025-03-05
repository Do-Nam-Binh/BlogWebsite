import { ThumbsUp, Smile } from "lucide-react";
import useFeedbacksApi from "./useFeedbacksApi";
import { useState } from "react";
import { Emoji } from "../../../types/Emoji";

interface ReactionProps {
  classnames: string;
  postId: string;
  likes: number;
  reactions: Map<string, number>;
}

const SideBar: React.FC<ReactionProps> = ({
  classnames,
  postId,
  likes,
  reactions,
}) => {
  const { handleLike, handleDislike, handleAddReact } = useFeedbacksApi();
  const [liked, setLiked] = useState(false);
  const [displayEmojis, setDisplayEmojis] = useState(false);
  return (
    <ul
      className={`z-20 tracking-wide sticky top-55 flex flex-col gap-5 ${classnames}`}
    >
      <li className="flex flex-col justify-center">
        <button
          onClick={() => {
            if (!liked) {
              handleLike(postId);
            } else {
              handleDislike(postId);
            }
            setLiked(!liked);
          }}
        >
          {liked ? (
            <ThumbsUp className="w-5 h-5 hover:scale-110" fill="#111" />
          ) : (
            <ThumbsUp className="w-5 h-5 hover:scale-110" />
          )}
        </button>
        <div className="text-center">{likes}</div>
      </li>
      <li className="relative flex">
        <button onClick={() => setDisplayEmojis(!displayEmojis)}>
          <Smile className="w-5 h-5 hover:scale-110" />
        </button>
        {displayEmojis ? (
          <div className="absolute top-[30px] left-[0px]">
            {Object.entries(Emoji).map(([key, emoji]) => {
              return (
                <div key={key} className="relative">
                  <div className="absolute top-[16px] left-[14px] ">
                    {reactions.get(emoji) || 0}
                  </div>
                  <button
                    className="mb-3 hover:scale-110"
                    onClick={() => handleAddReact(postId, key, emoji)}
                  >
                    {emoji}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
};

export default SideBar;
