import prisma from "../config/prisma.config.js";
import { errorResponse } from "../utils/response.util.js";

export const verifyProjectOwner = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!project) {
      errorResponse("This project does not exist!", 404);
    }

    if (project.ownerId !== Number(userId)) {
      errorResponse("You are not the owner of this project!", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyProjectMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!project) {
      errorResponse("This project does not exist!", 404);
    }

    const projectMember = await prisma.projectMember.findFirst({
      where: {
        projectId: project.id,
        userId: Number(userId),
      },
    });

    if (!projectMember) {
      errorResponse("You are not the member of this project!", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
