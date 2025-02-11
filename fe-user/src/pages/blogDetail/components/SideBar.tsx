import { ThumbsUp, Smile, MessageCircle } from "lucide-react";

const SideBar = ({ classnames }: { classnames: string }) => {
  return (
    <ul
      className={`tracking-wide sticky top-55 flex flex-col gap-5 ${classnames}`}
    >
      <li>
        <ThumbsUp className="w-5 h-5" />
      </li>
      <li>
        <Smile className="w-5 h-5" />
      </li>
      <li>
        <MessageCircle className="w-5 h-5" />
      </li>
    </ul>
  );
};

export default SideBar;
