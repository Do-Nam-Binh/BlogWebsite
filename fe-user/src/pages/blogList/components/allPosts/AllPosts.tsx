import { Post } from "../../../../types/Post";
import BlogCardHorizontal from "../blogCard/BlogCardHorizontal";

const AllPosts = ({ postList }: { postList: Array<Post> }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 grid-rows-3 ">
        {postList.map((post) => (
          <div key={post._id}>
            <BlogCardHorizontal id={post._id} title={post.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
