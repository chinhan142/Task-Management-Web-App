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
  const project = await prisma.project.findFirst({
    where: {
      id: Number(id),
      members: {
        some: {
          userId: Number(userId),
        },
      },
    },
  });

  return project;
};

export const createProject = async ({
  userId,
  name,
  description,
  startDate,
  endDate,
}) => {
  const newProject = await prisma.project.create({
    data: {
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
      ownerId: Number(userId),
    },
  });

  const newProjectTeam = await prisma.projectMember.create({
    data: {
      projectId: newProject.id,
      userId: Number(userId),
      role: "OWNER",
    },
  });

  return newProject;
};

export const editProject = async ({
  id,
  editName,
  editDescription,
  editStartDate,
  editEndDate,
}) => {
  const updateProject = await prisma.project.update({
    where: {
      id: Number(id),
    },
    data: {
      name: editName,
      description: editDescription,
      startDate: new Date(editStartDate),
      endDate: new Date(editEndDate),
      updatedAt: new Date(Date.now()),
    },
  });

  return updateProject;
};

export const deleteProject = async (id) => {
  const deleteProject = await prisma.project.delete({
    where: {
      id: Number(id),
    },
  });

  return deleteProject;
};
