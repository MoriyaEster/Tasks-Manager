import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import usersTasksRoutes from "./routes/usersTasksRoutes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5174"
  }));
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/usersTasks", usersTasksRoutes);

export default app;
