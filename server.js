import express from "express";
import "dotenv/config.js";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import projectRoutes from "./src/routes/project.routes.js";

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
  res.status(statusCode).json({
    success: false,
    message: err.message || "System error!",
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
