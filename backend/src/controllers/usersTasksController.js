import { assignUserToTask, removeUserFromTask, getUsersForTask, getTasksForUser, getTasksForUserByName, getAllConnections } from "../models/usersTasksModel.js";
import { validationResult } from "express-validator";

const assignUser = async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { username, taskId } = req.body
        const success = await assignUserToTask(username, taskId);
        if (success) {
            res.json({ message: "User assigned to task successfully" });
        } else {
            res.status(404).json({ error: "Failed to assign user to task" });
        }
    } catch (err) {
        console.error("Error assigning user to task:", err);
        res.status(500).json({ error: "Failed to assign user to task" });
    }
}

const removeUser = async (req, res) => {
    try {
        const { username, taskId } = req.body
        const success = await removeUserFromTask(username, taskId);

        console.log("username", username)
        console.log("taskId", taskId)
        console.log("success", success)

        if (success) {
            res.json({ message: "User removed from task successfully" });
        } else {
            res.status(404).json({ error: "Failed to remove user from task" });
        }
    } catch (err) {
        console.error("Error removing user from task:", err);
        res.status(500).json({ error: "Failed to remove user from task" });
    }
}

const getAllTasksForUser = async (req, res) => {
    try {
        const username = req.params.username
        const tasks = await getTasksForUser(username)

        if (!tasks) {
            return res.status(404).json({ error: "Tasks not found" })
        }

        res.json(tasks)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks for user" })
    }
}
const getAllUsersForTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const users = await getUsersForTask(taskId)

        if (!users) {
            return res.status(404).json({ error: "Users not found" })
        }

        res.json(users)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users for task" })
    }
}

const getAllTasksForUserByName = async (req, res) => {
    try {
        const username = req.params.username
        const tasks = await getTasksForUserByName(username)

        if (!tasks) {
            return res.status(404).json({ error: "Tasks not found" })
        }

        res.json(tasks)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks for user" })
    }
}

const getAllTaskToUser = async (req, res) => {
    try {
        const connections = await getAllConnections()

        if (!connections) {
            return res.status(404).json({ error: "Connections not found" })
        }
        res.json(connections)
    } catch (err) {
        res.status(500).json ({ error: "Failed to fetch connections" })
    }
    
    
}

export { assignUser, removeUser, getAllTasksForUser, getAllUsersForTask, getAllTasksForUserByName, getAllTaskToUser }