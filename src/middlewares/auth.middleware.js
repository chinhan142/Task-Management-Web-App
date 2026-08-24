import { errorResponse } from "../utils/response.util.js";
import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const authHeader = req.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    errorResponse("Please login to continue!", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
