import prisma from "../config/prisma.config.js";

export const getAllTask = async (id) => {
  const taskList = await prisma.task.findMany({
    where: {
      projectId: Number(id),
    },
  });

  return taskList;
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
      dueDate: new Date(dueDate),
      projectId: Number(id),
      assigneeId: Number(assigneeId),
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
