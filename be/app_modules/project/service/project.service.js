import Project from "../entity/project.model.js";

export const getAllProjectsService = async () => {
  try {
    const projects = await Project.find();
    return projects;
  } catch (error) {
    throw error;
  }
};
