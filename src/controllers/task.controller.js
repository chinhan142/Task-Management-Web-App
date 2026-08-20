import {
  addTask,
  deleteTask,
  editTask,
  editTaskStatus,
  getAllTask,
} from "../services/task.service.js";
import { sendResponse } from "../utils/response.util.js";

export const getAllTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const taskList = await getAllTask(id);

    sendResponse(res, 200, true, "Get tasks list successfully!", taskList);
  } catch (error) {
    next(error);
  }
};

export const addTaskController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const createdById = req.user.id;

    const { title, description, status, priority, dueDate, assigneeId } =
      req.body;

    const newTask = await addTask({
      id,
      createdById,
      title,
      description,
      status,
      priority,
      dueDate,
      assigneeId,
    });

    sendResponse(res, 200, true, "Task create successfully!", newTask);
  } catch (error) {
    next(error);
  }
};

export const editTaskController = async (req, res, next) => {
  try {
    const { id, taskId } = req.params;

    const {
      editTitle,
      editDescription,
      editStatus,
      editPriority,
      editDueDate,
    } = req.body;

    const updatedTask = await editTask({
      id,
      taskId,
      editTitle,
      editDescription,
      editStatus,
      editPriority,
      editDueDate,
    });

    sendResponse(res, 200, true, "Task updated successfully!", updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await deleteTask(taskId);

    sendResponse(res, 200, true, "Task removed successfully!", true);
  } catch (error) {
    next(error);
  }
};

export const editTaskStatusController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { editStatus } = req.body;

    const newTaskStatus = await editTaskStatus({ taskId, editStatus });

    sendResponse(
      res,
      200,
      true,
      "Task status update successfully!",
      newTaskStatus.status,
    );
  } catch (error) {
    next(error);
  }
};
