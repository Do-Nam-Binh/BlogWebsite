import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  id: string;
  title: string;
  summary: string;
}

const BlogCardVertical: React.FC<BlogCardProps> = ({ id, title, summary }) => {
  const navigate = useNavigate();

  const handleViewDetail = (id: string) => {
    navigate(`/blog/detail/${id}`);
  };

  return (
    <button
      onClick={() => handleViewDetail(id)}
      className="flex justify-center items-center h-full w-full flex-col cursor-pointer"
    >
      <div className="relative flex flex-col text-gray-700 bg-white bg-clip-border rounded-xl w-120 w-full h-full">
        <div className="block aspect-[16/9] w-full ">
          <img
            src="/stockimagelong.png"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="mb-[6px] text-[1.75rem] font-bold text-left mt-[16px]">
          {title}
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 max-h-30 overflow-hidden text-ellipsis self-start">
          {summary}
        </p>
      </div>
    </button>
  );
};

export default BlogCardVertical;
