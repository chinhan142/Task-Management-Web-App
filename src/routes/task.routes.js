import express from "express";
import {
  addTaskController,
  deleteTaskController,
  editTaskController,
  getAllTaskController,
} from "../controllers/task.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";
import { verifyProjectOwner } from "../middlewares/project.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", validateToken, verifyProjectOwner, getAllTaskController);

router.post("/", validateToken, verifyProjectOwner, addTaskController);

router.put("/:taskId", validateToken, verifyProjectOwner, editTaskController);

router.delete(
  "/:taskId",
  validateToken,
  verifyProjectOwner,
  deleteTaskController,
);

export default router;
