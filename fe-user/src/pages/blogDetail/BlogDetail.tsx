import DOMPurify from "dompurify";
import { ThumbsUp, Smile, MessageCircle } from "lucide-react";

interface BlogPostContent {
  date: Date;
  title: string;
  summary: string;
  content: string;
  categories: string[];
  tags: string[];
}

const BlogDetail: React.FC<BlogPostContent> = ({
  date,
  title,
  summary,
  content,
  categories,
  tags,
}) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <>
      <div className="flex justify-center my-20">
        <div className="grid grid-cols-[30px_2fr_1fr] justify-between mx-20 max-w-300 h-full relative min-h-[1500px]">
          <ul className="sticky top-10 flex flex-col gap-5 pt-6">
            <li>
              <ThumbsUp className="w-5 h-5 text-blue-500" />
            </li>
            <li>
              <Smile className="w-5 h-5 text-yellow-500" />
            </li>
            <li>
              <MessageCircle className="w-5 h-5 text-gray-500" />
            </li>
          </ul>

          <div className="flex flex-col items-start w-full min-w-200 border-1 border-slate-400 rounded-sm p-15 justify-between">
            <div>
              <header className="text-[3.5rem] font-semibold">{title}</header>
              <div className="text-[1rem]">
                {"Posted on "}
                {date.toLocaleString("en-US", {
                  month: "short",
                  timeZone: "UTC",
                })}{" "}
                {date.getUTCDate()}
              </div>
              <div className="flex gap-3 text-[0.8rem]">
                {categories.map((category) => {
                  return <div>@{category}</div>;
                })}
              </div>
              <div className="flex gap-3 text-[0.8rem]">
                {tags.map((tag) => {
                  return <div>#{tag}</div>;
                })}
              </div>
            </div>
            <div className="text-[1rem]">{summary}</div>
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>

          <div className="flex flex-col my-20 w-full">
            <div>rec 1</div>
            <div>rec 2</div>
            <div>rec 3</div>
            <div>rec 4</div>
            <div>rec 5</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
