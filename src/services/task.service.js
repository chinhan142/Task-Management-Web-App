import prisma from "../config/prisma.config.js";

export const getAllTask = async ({
  id,
  page,
  limit,
  status,
  priority,
  assigneeId,
  search,
}) => {
  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 2;

  const skip = (currentPage - 1) * currentLimit;

  const filterCondition = {
    projectId: Number(id),
    status: status || undefined,
    priority: priority || undefined,
    assigneeId: Number(assigneeId) || undefined,
    title: search
      ? {
          contains: search,
        }
      : undefined,
  };

  const taskList = await prisma.task.findMany({
    skip: skip,
    take: currentLimit,
    where: filterCondition,
    orderBy: {
      dueDate: "asc",
    },
  });

  const totalTask = await prisma.task.count({
    where: filterCondition,
  });

  const totalPages = Math.ceil(totalTask / currentLimit);

  return {
    totalTask,
    currentPage,
    currentLimit,
    totalPages,
    taskList,
  };
};

export const addTask = async ({
  id,
  createdById,
  title,
  description,
  status,
  priority,
  dueDate,
  assigneeId,
}) => {
  const newTask = await prisma.task.create({
    data: {
      title: title,
      description: description,
      status: status ? status : undefined,
      priority: priority ? priority : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      projectId: Number(id),
      assigneeId: assigneeId ? Number(assigneeId) : null,
      createdById: Number(createdById),
    },
  });

  return newTask;
};

export const editTask = async ({
  id,
  taskId,
  editTitle,
  editDescription,
  editStatus,
  editPriority,
  editDueDate,
  editAssigneeId,
}) => {
  const updatedTask = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      title: editTitle,
      description: editDescription,
      status: editStatus,
      priority: editPriority,
      dueDate: editDueDate ? new Date(editDueDate) : undefined,
      assigneeId: editAssigneeId ? Number(editAssigneeId) : undefined,
    },
  });

  return updatedTask;
};

export const deleteTask = async (taskId) => {
  const deleteTask = await prisma.task.delete({
    where: {
      id: Number(taskId),
    },
  });

  return deleteTask;
};

export const editTaskStatus = async ({ taskId, editStatus }) => {
  const taskStatusUpdate = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      status: editStatus,
    },
  });

  return taskStatusUpdate;
};
