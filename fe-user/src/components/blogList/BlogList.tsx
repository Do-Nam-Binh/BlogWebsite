import { Post } from "../../types/Post";
import BlogCard from "../blogCard/BlogCard";

const BlogList = ({ postList }: { postList: Array<Post> }) => {
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 w-full">
        {postList.map((post, index) => (
          <div
            key={post._id}
            className={`${
              index === 0
                ? "col-span-6 lg:col-span-4 row-span-2" // First post spans 2/3 columns and 2 rows
                : "col-span-6 lg:col-span-2" // Other posts span 1/3 columns
            }`}
          >
            <BlogCard
              date={post.postedDate}
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

export default BlogList;
