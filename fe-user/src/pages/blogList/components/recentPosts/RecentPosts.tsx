import { Post } from "../../../../types/Post";
import BlogCardHorizontal from "../blogCard/BlogCardHorizontal";
import BlogCardVertical from "../blogCard/BlogCardVertical";

const RecentPosts = ({ postList }: { postList: Array<Post> }) => {
  return (
    <>
      <div className="container mx-auto w-full text-2xl font-semibold mb-5 mt-10">
        Recent Posts
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full justify-items-stretch grid-rows-3 lg:h-200">
        {postList.map((post, index) => (
          <div
            key={post._id}
            className={`${
              index === 0
                ? "col-span-6 lg:col-span-3 row-span-2" // First post spans 2/3 columns and 2 rows
                : index === 3
                ? "col-span-6 lg:col-span-6 row-span-1"
                : "col-span-6 lg:col-span-3" // Other posts span 1/3 columns
            }`}
          >
            {index === 0 ? (
              <BlogCardVertical
                createdAt={new Date(post.createdAt)}
                title={post.title}
                summary={post.summary}
                categories={post.categories}
                tags={post.tags}
              />
            ) : (
              <BlogCardHorizontal
                createdAt={new Date(post.createdAt)}
                title={post.title}
                summary={post.summary}
                categories={post.categories}
                tags={post.tags}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentPosts;
