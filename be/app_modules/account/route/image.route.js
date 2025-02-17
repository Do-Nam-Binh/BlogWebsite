import express from "express";
import { uploadImage } from "../controller/image.controller.js";

const router = express.Router();

router.get("/upload", uploadImage);

export default router;
