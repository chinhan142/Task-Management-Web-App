import express from "express";

import {
  getProfileController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

import {
  validateLogin,
  validateRegister,
} from "../middlewares/validate.middleware.js";
import { validateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);
router.get("/me", validateToken, getProfileController);

export default router;
