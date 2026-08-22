import prisma from "../config/prisma.config.js";

export const addMember = async ({ id, userId }) => {
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
