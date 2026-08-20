import {
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

export const createProjectController = (req, res, next) => {};

export const editProjectController = (req, res, next) => {};

export const deleteProjectController = (req, res, next) => {};
