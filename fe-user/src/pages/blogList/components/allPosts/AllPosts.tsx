import { Post } from "../../../../types/Post";
import BlogCardVertical from "../blogCard/BlogCardVertical";

const AllPosts = ({ postList }: { postList: Array<Post> }) => {
  return (
    <>
      <div className="container mx-auto w-full text-2xl font-semibold mb-5 mt-10">
        All Posts
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full justify-items-stretch grid-rows-3 ">
        {postList.map((post) => (
          <div key={post._id}>
            <BlogCardVertical
              id={post._id}
              createdAt={new Date(post.createdAt)}
              title={post.title}
              summary={post.summary}
              categories={post.categories}
              tags={post.tags}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllPosts;
