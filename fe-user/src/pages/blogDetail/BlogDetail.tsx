import DOMPurify from "dompurify";
import SideBar from "./components/SideBar";
import Comment from "../comments/Comment";
import { useParams } from "react-router-dom";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";

const BlogDetail = () => {
  const { id } = useParams();
  const { posts } = useSelector((state: RootState) => state.post); // Assuming posts are in Redux store

  const post = posts.find((post) => post._id === id); // Find the post by ID

  if (!post) {
    return <p>Post not found</p>;
  }

  const { createdAt, title, summary, content, categories, tags } = post;

  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <>
      <div className="flex justify-center my-10 relative">
        <SideBar classnames={"self-start"} />
        <div className="grid grid-cols-[2.5fr_1fr] mr-20 ml-5 max-w-300 h-full gap-10">
          <div className="flex flex-col">
            <div className="flex flex-col items-start w-full min-w-200 border-1 border-slate-400 rounded-sm p-15 pt-8 justify-start">
              <div className="mb-15">
                <header className="text-[3.5rem] font-semibold">{title}</header>
                <div className="text-[1rem]">
                  {"Posted on "}
                  {new Date(createdAt).toLocaleString("en-US", {
                    month: "short",
                    timeZone: "UTC",
                  })}{" "}
                  {new Date(createdAt).getUTCDate()}
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
              <div className="text-[1rem] mb-8">{summary}</div>
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>

            <div className="border-b-1 my-10  border-slate-300"></div>

            <Comment />
          </div>

          <div className="flex flex-col w-full h-full border-1 border-slate-400 rounded-sm p-8 px-5">
            <div className="text-[1.5rem] border-b-1">Read next</div>

            <div className="flex flex-col gap-5 mt-8">
              <div>Rec 1</div>
              <div>Rec 2</div>
              <div>Rec 3</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
