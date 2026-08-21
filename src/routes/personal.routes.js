import express from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { getTaskStatsController } from "../controllers/personal.controller.js";

const router = express.Router();

router.get("/stats", validateToken, getTaskStatsController);

export default router;
