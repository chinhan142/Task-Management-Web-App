import express from "express";
import {
  addTaskController,
  deleteTaskController,
  editTaskController,
  editTaskStatusController,
  getAllTaskController,
} from "../controllers/task.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";
import {
  verifyProjectMember,
  verifyProjectOwner,
} from "../middlewares/project.middleware.js";
import { verifyTaskOwner } from "../middlewares/task.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", validateToken, verifyProjectMember, getAllTaskController);

router.post("/", validateToken, verifyProjectOwner, addTaskController);

router.put("/:taskId", validateToken, verifyProjectOwner, editTaskController);

router.patch(
  "/:taskId/status",
  validateToken,
  verifyProjectMember,
  verifyTaskOwner,
  editTaskStatusController,
);

router.delete(
  "/:taskId",
  validateToken,
  verifyProjectOwner,
  deleteTaskController,
);

export default router;
