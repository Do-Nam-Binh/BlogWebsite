import { Post } from "../../types/Post";
import AllPosts from "./components/allPosts/AllPosts";
import RecentPosts from "./components/recentPosts/RecentPosts";
import SearchBar from "./components/searchBar/SearchBar";

const BlogList = ({ postList }: { postList: Array<Post> }) => {
  return (
    <>
      <div className="flex flex-col mx-auto w-[75%] my-40">
        <SearchBar />
        <RecentPosts postList={postList.slice(0, 4)} format="mt-30" />
        <AllPosts postList={postList} format="mt-70" />
      </div>
    </>
  );
};

export default BlogList;
