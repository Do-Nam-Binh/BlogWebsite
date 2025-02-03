import { Post } from "../../types/Post";
import RecentPosts from "./components/recentPosts/RecentPosts";

const BlogList = ({ postList }: { postList: Array<Post> }) => {
  return (
    <>
      <div>
        <RecentPosts postList={postList} />
      </div>
    </>
  );
};

export default BlogList;
