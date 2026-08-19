import prisma from "../config/prisma.config.js";
import { sendResponse, errorResponse } from "../utils/response.util.js";
import env from "dotenv";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerService = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    errorResponse("This email is used!", 400);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashPassword,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return user;
};

export const loginService = async ({ email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    errorResponse("Email or password is not correct!", 401);
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    errorResponse("Email or password is not correct!", 401);
  }

  const payload = {
    id: existingUser.id,
    token_type: "ACCESS",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return {
    token,
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    },
  };
};
