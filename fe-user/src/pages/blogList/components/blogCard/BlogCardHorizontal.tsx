import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  id: string;
  createdAt: Date;
  title: string;
  summary: string;
  categories: string[];
  tags: string[];
}

const BlogCardHorizontal: React.FC<BlogCardProps> = ({
  id,
  createdAt,
  title,
  summary,
  categories,
  tags,
}) => {
  const navigate = useNavigate();

  const handleViewDetail = (id: string) => {
    navigate(`/blog/detail/${id}`);
  };
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <div className="relative flex text-gray-700 bg-white bg-clip-border rounded-xl w-120 w-full h-full gap-10">
        <div className="block mborder-slate-300 w-1/2">
          <img
            src="/stockimagelong.png"
            alt=""
            className="w-full h-full object-cover rounded-lg mb-4"
          />
        </div>
        <div className="flex justify-center items-start h-full flex-col w-1/2">
          <div className="text-gray-500 text-sm">{createdAt.toUTCString()}</div>
          <div className="flex items-center justify-between mb-2 w-full">
            <p className="block font-sans text-lg antialiased font-semibold leading-relaxed text-blue-gray-900">
              {title}
            </p>
            <button
              className="select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-115 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              type="button"
              onClick={() => handleViewDetail(id)}
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
    </div>
  );
};

export default BlogCardHorizontal;
