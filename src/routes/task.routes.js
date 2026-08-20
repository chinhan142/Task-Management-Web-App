import express from "express";
import {
  addTaskController,
  editTaskController,
} from "../controllers/task.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";
import { verifyProjectOwner } from "../middlewares/project.middleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", validateToken, verifyProjectOwner, addTaskController);

router.put("/:taskId", validateToken, verifyProjectOwner, editTaskController);

export default router;
