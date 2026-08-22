import express from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { getProjectStatsController } from "../controllers/stat.controller.js";
import { verifyProjectMember } from "../middlewares/project.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", validateToken, verifyProjectMember, getProjectStatsController);

export default router;
