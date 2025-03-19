import { Post } from "../../types/Post";
import AllPosts from "./components/allPosts/AllPosts";
import RecentPosts from "./components/recentPosts/RecentPosts";

const BlogList = ({ postList }: { postList: Array<Post> }) => {
  return (
    <>
      <div className="flex flex-col gap-60 mx-auto w-[75%] my-40">
        <RecentPosts postList={postList.slice(0, 4)} />
        <AllPosts postList={postList} />
      </div>
    </>
  );
};

export default BlogList;
