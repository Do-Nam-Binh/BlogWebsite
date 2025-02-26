import express from "express";
import { getAllProject } from "../controller/project.controller.js";

const router = express.Router();

router.get("/all", getAllProject);

export default router;
