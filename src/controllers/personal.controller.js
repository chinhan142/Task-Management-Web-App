import { getPersonalTaskStat } from "../services/stat.service.js";
import { sendResponse } from "../utils/response.util.js";

export const getTaskStatsController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const personalStats = await getPersonalTaskStat(userId);

    sendResponse(
      res,
      200,
      true,
      "Get personal task stats successfully!",
      personalStats,
    );
  } catch (error) {
    next(error);
  }
};
