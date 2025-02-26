import ProjectCard from "./components/ProjectCard";
import { fetchProjects } from "../../state/project/projectSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { useEffect, useState } from "react";

const Projects = () => {
  const dispatch = useAppDispatch();
  const { projects, loading, error } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!isAnimating) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {" "}
      <div className="relative max-w-5xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Some of my projects
        </h1>

        <div className="text-center">
          See more on my{" "}
          <a
            href="https://github.com/Do-Nam-Binh"
            className="text-blue-500 hover:text-blue-600"
          >
            GitHub
          </a>
        </div>

        <div className="relative flex items-center justify-center h-[800px] overflow-hidden">
          {/* Previous Slide (Left, smaller & faded) */}
          <div
            className={`absolute left-0 -translate-x-1/2 opacity-50 scale-90`}
          >
            <ProjectCard
              {...projects[
                (currentIndex - 1 + projects.length) % projects.length
              ]}
            />
          </div>

          {/* Current Slide (Centered) */}
          <div
            className={`z-10 scale-105 transition-all duration-300 ease-in-out ${
              isAnimating ? "transform scale-110" : ""
            }`}
          >
            <ProjectCard {...projects[currentIndex]} />
          </div>

          {/* Next Slide (Right, smaller & faded) */}
          <div
            className={`absolute right-0 translate-x-1/2 opacity-50 scale-90`}
          >
            <ProjectCard {...projects[(currentIndex + 1) % projects.length]} />
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Projects;
