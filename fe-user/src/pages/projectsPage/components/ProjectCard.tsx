interface ProjectCardProps {
  _id: string;
  title: string;
  description: string;
  preview: string;
  link: string;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  _id,
  title,
  description,
  preview,
  link,
}) => {
  return (
    <>
      <div className="flex flex-col py-4 px-2 items-center gap-2">
        <div className="font-bold text-[3rem]">{title}</div>

        {preview ? (
          <img
            id={_id}
            src={preview}
            alt="Preview"
            className="max-w-200 min-w-120 rounded"
          />
        ) : (
          ""
        )}
        <div>{description}</div>
        <a href={link} target="_blank" className="text-blue-600">
          Live preview
        </a>
      </div>
    </>
  );
};

export default ProjectCard;
