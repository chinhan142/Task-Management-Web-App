import express from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { getProjectStatsController } from "../controllers/stat.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/", validateToken, getProjectStatsController);

export default router;
