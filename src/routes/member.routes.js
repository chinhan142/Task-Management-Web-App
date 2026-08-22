import express from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { verifyProjectOwner } from "../middlewares/project.middleware.js";
import {
  addMemberController,
  deleteMemberController,
} from "../controllers/member.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", validateToken, verifyProjectOwner, addMemberController);

router.delete(
  "/:memberId",
  validateToken,
  verifyProjectOwner,
  deleteMemberController,
);

export default router;
