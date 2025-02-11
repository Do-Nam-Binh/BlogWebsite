import { Post } from "../../types/Post";
import AllPosts from "./components/allPosts/AllPosts";
import RecentPosts from "./components/recentPosts/RecentPosts";

const BlogList = ({ postList }: { postList: Array<Post> }) => {
  return (
    <>
      <div className="mb-30">
        <RecentPosts postList={postList.slice(0, 4)} />
      </div>

      <div>
        <AllPosts postList={postList} />
      </div>
    </>
  );
};

export default BlogList;
