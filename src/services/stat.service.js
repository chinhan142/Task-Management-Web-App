import prisma from "../config/prisma.config.js";

export const getProjectStats = async (id) => {
  const [totalTask, statusStats, overDueTasks] = await Promise.all([
    prisma.task.count({
      where: {
        projectId: Number(id),
      },
    }),

    prisma.task.groupBy({
      by: ["status"],
      where: {
        projectId: Number(id),
      },
      _count: {
        _all: true,
      },
    }),

    prisma.task.count({
      where: {
        projectId: Number(id),
        dueDate: {
          lt: new Date(),
        },
        status: {
          not: "DONE",
        },
      },
    }),
  ]);

  const statusSummary = statusStats.reduce((acc, curr) => {
    acc[curr.status] = curr._count._all;
    return acc;
  }, {});

  return { totalTask, statusSummary, overDueTasks };
};

export const getPersonalTaskStat = async (userId) => {
  const [assignedTasks, completedTasks] = await Promise.all([
    prisma.task.count({
      where: {
        assigneeId: Number(userId),
      },
    }),

    prisma.task.count({
      where: {
        assigneeId: Number(userId),
        status: {
          in: ["DONE"],
        },
      },
    }),
  ]);

  return { assignedTasks, completedTasks };
};
