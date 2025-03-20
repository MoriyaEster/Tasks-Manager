import express from "express";
import { getAllTasks, getTask, addTask, editTask, removeTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTask);
router.post("/", addTask)
router.patch("/tasks/:id", editTask);
router.delete("/tasks/:id", removeTask)

export default router;
