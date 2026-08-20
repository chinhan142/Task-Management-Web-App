import express from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import {
  createProjectController,
  deleteProjectController,
  editProjectController,
  getProjectDetailController,
  getProjectListController,
} from "../controllers/project.controller.js";
import { verifyProjectOwner } from "../middlewares/project.middleware.js";

const router = express.Router();

router.get("/", validateToken, getProjectListController);

router.get("/:id", validateToken, getProjectDetailController);

router.post("/", validateToken, createProjectController);

router.put("/:id", validateToken, verifyProjectOwner, editProjectController);

router.delete(
  "/:id",
  validateToken,
  verifyProjectOwner,
  deleteProjectController,
);

export default router;
