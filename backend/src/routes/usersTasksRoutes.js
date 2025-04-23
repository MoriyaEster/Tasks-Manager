import express from "express";
import { assignUser, removeUser, getAllTasksForUser, getAllUsersForTask, getAllTasksForUserByName, getAllTaskToUser } from "../controllers/usersTasksController.js";
import { createUserValidator } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/assign",createUserValidator, assignUser);
router.delete("/remove", removeUser);
router.get("/:userId/tasks", getAllTasksForUser);
router.get("/:taskId/users", getAllUsersForTask);
router.get("/tasks/:username", getAllTasksForUserByName);
router.get ("/connections", getAllTaskToUser)

export default router;
