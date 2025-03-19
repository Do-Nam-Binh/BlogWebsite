import { Post } from "../../../../types/Post";
import BlogCardHorizontal from "../blogCard/BlogCardHorizontal";
import BlogCardVertical from "../blogCard/BlogCardVertical";

const RecentPosts = ({ postList }: { postList: Array<Post> }) => {
  return (
    <>
      <div className="grid grid-cols-1 grid-cols-2 gap-8 grid-rows-3 aspect-[10/4]">
        {postList.map((post, index) => (
          <div
            key={post._id}
            className={`${
              index === 0
                ? "col-span-6 lg:col-span-1 row-span-3" // First post spans 2/3 columns and 2 rows
                : "col-span-6 lg:col-span-1" // Other posts span 1/3 columns
            }`}
          >
            {index === 0 ? (
              <BlogCardVertical
                id={post._id}
                title={post.title}
                summary={post.summary}
              />
            ) : (
              <BlogCardHorizontal id={post._id} title={post.title} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentPosts;
