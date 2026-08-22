import prisma from "../config/prisma.config.js";
import { errorResponse } from "../utils/response.util.js";

export const addMember = async ({ id, userId }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    errorResponse("This user does not exist!", 404);
  }

  const isExistMember = await prisma.projectMember.findFirst({
    where: {
      projectId: Number(id),
      userId: Number(userId),
    },
  });

  if (isExistMember) {
    errorResponse("This user is already a member", 400);
  }

  const projectMember = await prisma.projectMember.create({
    data: {
      projectId: Number(id),
      userId: Number(userId),
    },
  });

  return projectMember;
};

export const deleteMember = async ({ id, memberId }) => {
  const deleteMember = await prisma.projectMember.delete({
    where: {
      projectId_userId: {
        projectId: Number(id),
        userId: Number(memberId),
      },
    },
  });

  return deleteMember;
};
