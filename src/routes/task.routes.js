import express from "express";
import {
  addTaskController,
  deleteTaskController,
  editTaskController,
  editTaskStatusController,
  getAllTaskController,
} from "../controllers/task.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";
import { verifyProjectOwner } from "../middlewares/project.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", validateToken, verifyProjectOwner, getAllTaskController);

router.post("/", validateToken, verifyProjectOwner, addTaskController);

router.put("/:taskId", validateToken, verifyProjectOwner, editTaskController);

router.patch(
  "/:taskId/status",
  validateToken,
  verifyProjectOwner,
  editTaskStatusController,
);

router.delete(
  "/:taskId",
  validateToken,
  verifyProjectOwner,
  deleteTaskController,
);

export default router;
