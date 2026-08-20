import prisma from "../config/prisma.config.js";

export const getProjectList = async (userId) => {
  const projectList = await prisma.projectMember.findMany({
    where: {
      userId: Number(userId),
    },
    select: {
      role: true,
      joinedAt: true,
      project: {
        select: {
          id: true,
          name: true,
          description: true,
          startDate: true,
          createdAt: true,
        },
      },
    },
  });

  return projectList;
};

export const getProjectDetail = async ({ userId, id }) => {
  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
      ownerId: Number(userId),
    },
  });

  return project;
};
