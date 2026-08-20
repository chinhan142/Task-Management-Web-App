import {
  createProject,
  editProject,
  getProjectDetail,
  getProjectList,
} from "../services/project.service.js";
import { errorResponse, sendResponse } from "../utils/response.util.js";

export const getProjectListController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const projectList = await getProjectList(userId);

    sendResponse(res, 200, true, "Get project list successfully!", projectList);
  } catch (error) {
    next(error);
  }
};

export const getProjectDetailController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const project = await getProjectDetail({ userId, id });

    if (project == null) {
      errorResponse("Project not found!", 404);
    }

    sendResponse(res, 200, true, "Project detail get successfully!", project);
  } catch (error) {
    next(error);
  }
};

export const createProjectController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { name, description, startDate, endDate } = req.body;

    const newProject = await createProject({
      userId,
      name,
      description,
      startDate,
      endDate,
    });

    sendResponse(res, 200, true, "Project create successfully!", newProject);
  } catch (error) {
    next(error);
  }
};

export const editProjectController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { editName, editDescription, editStartDate, editEndDate } = req.body;

    const updateProject = await editProject({
      id,
      editName,
      editDescription,
      editStartDate,
      editEndDate,
    });

    sendResponse(
      res,
      200,
      true,
      "Project updated successfully!",
      updateProject,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteProjectController = (req, res, next) => {};
