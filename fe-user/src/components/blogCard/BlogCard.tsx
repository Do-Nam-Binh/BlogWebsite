interface BlogCardProps {
  date: Date;
  title: string;
  summary: string;
  categories: string[];
  tags: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({
  date,
  title,
  summary,
  categories,
  tags,
}) => {
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <div className="relative flex flex-col text-gray-700 bg-white bg-clip-border rounded-xl w-120 p-5 w-full">
        <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 w-full">
          <img
            src="/vite.svg"
            alt=""
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        </div>
        <div className="text-gray-500 text-sm">{date.toUTCString()}</div>
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-lg antialiased font-semibold leading-relaxed text-blue-gray-900">
            {title}
          </p>
          <button
            className="select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-115 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            type="button"
          >
            <img
              src="/right-up.png"
              alt="read more"
              className="w-5 opacity-80"
            />
          </button>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 flex-grow">
          {summary}
        </p>
        <div className="mt-3">
          <ul className="flex gap-2">
            {categories.map((category) => (
              <li
                key={category}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3">
          <ul className="flex gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
