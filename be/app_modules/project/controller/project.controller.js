import { getAllProjectsService } from "../service/project.service.js";

export const getAllProject = async (req, res) => {
  try {
    const projects = await getAllProjectsService();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
