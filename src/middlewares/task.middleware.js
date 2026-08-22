import prisma from "../config/prisma.config.js";
import { errorResponse } from "../utils/response.util.js";

export const verifyTaskOwner = async (req, res, next) => {
  try {
    const { id, taskId } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.findUnique({
      where: {
        id: Number(taskId),
      },
    });

    if (!task) {
      errorResponse("This task does not exist!", 404);
    }

    if (task.projectId !== Number(id)) {
      errorResponse("This task does not belong to this project!", 400);
    }

    const project = await prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!project) {
      errorResponse("Project not found!", 404);
    }

    const isProjectOwner = project.ownerId === Number(userId);
    const isAssignee = task.assigneeId === Number(userId);

    if (!isProjectOwner && !isAssignee) {
      errorResponse("You are not assigned to this task or project owner!", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
