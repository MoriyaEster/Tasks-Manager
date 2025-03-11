import express from "express";
import { getAllTasks, getTask } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", getTask);

export default router;
