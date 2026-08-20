import express from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import {
  createProjectController,
  deleteProjectController,
  editProjectController,
  getProjectDetailController,
  getProjectListController,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", validateToken, getProjectListController);

router.get("/:id", validateToken, getProjectDetailController);

router.post("/", validateToken, createProjectController);

router.put("/:id", validateToken, editProjectController);

router.delete("/:id", validateToken, deleteProjectController);

export default router;
