import express from "express";
import "dotenv/config.js";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import projectRoutes from "./src/routes/project.routes.js";
import { errorResponse, sendResponse } from "./src/utils/response.util.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running smoothly",
  });
});

// Route defining
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);

// Middlware for routes
app.use((req, res, next) => {
  const error = new Error("Route does not exist!");
  error.status = 404;
  next(error);
});

// Global middlware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "System error!";

  sendResponse(res, statusCode, false, message, null);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
