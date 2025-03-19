import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  id: string;
  title: string;
}

const BlogCardHorizontal: React.FC<BlogCardProps> = ({ id, title }) => {
  const navigate = useNavigate();

  const handleViewDetail = (id: string) => {
    navigate(`/blog/detail/${id}`);
  };
  return (
    <button
      type="button"
      onClick={() => handleViewDetail(id)}
      className="flex justify-center items-center h-full w-full flex-col cursor-pointer"
    >
      <div className="relative grid grid-cols-2 text-gray-700 bg-white bg-clip-border rounded-xl w-120 w-full h-full gap-10 items-center justify-start">
        <div className="block aspect-[16/9]">
          <img
            src="/stockimagelong.png"
            alt=""
            className="w-full h-full object-cover rounded-lg mb-4"
          />
        </div>

        <div className="mb-2 text-[1.25rem] font-semibold text-left">
          {title}
        </div>
      </div>
    </button>
  );
};

export default BlogCardHorizontal;
