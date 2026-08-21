import { getProjectStats } from "../services/stat.service.js";
import { sendResponse } from "../utils/response.util.js";

export const getProjectStatsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const projectStats = await getProjectStats(id);

    sendResponse(
      res,
      200,
      true,
      "Get project stats successfully!",
      projectStats,
    );
  } catch (error) {
    next(error);
  }
};
