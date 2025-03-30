import express from "express";
import { assignUser, removeUser, getAllTasksForUser, getAllUsersForTask } from "../controllers/usersTasksController.js";

const router = express.Router();

router.post("/assign", assignUser);
router.post("/remove", removeUser);
router.get("/:userId/tasks", getAllTasksForUser);
router.get("/:taskId/users", getAllUsersForTask);

export default router;
