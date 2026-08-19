import prisma from "../config/prisma.config.js";
import { sendResponse } from "../utils/response.util.js";
import env from "dotenv";
import bcrypt, { hash } from "bcryptjs";

export const registerService = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    const error = new Error("This email is used!");
    error.status = 400;
    throw error;
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

export const loginService = async ({ email, password }) => {};
