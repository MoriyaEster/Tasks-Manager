import express from "express";
import { getAllTasks, getTask, addTask, editTask, removeTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", getTask);
router.post("/", addTask) //midelware
router.patch("/:id", editTask);
router.delete("/:id", removeTask)

export default router;
