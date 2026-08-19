import {
  getProfileService,
  loginService,
  registerService,
} from "../services/auth.service.js";
import { sendResponse } from "../utils/response.util.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await registerService({ name, email, password });

    return sendResponse(
      res,
      201,
      true,
      "Account register successfully!",
      newUser,
    );
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await loginService({ email, password });

    return sendResponse(res, 200, true, "Login successfully!", data);
  } catch (error) {
    next(error);
  }
};

export const getProfileController = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await getProfileService(id);

    return sendResponse(res, 200, true, "User profile get successfully!", user);
  } catch (error) {
    next(error);
  }
};
