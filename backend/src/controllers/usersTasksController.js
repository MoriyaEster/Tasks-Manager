import { assignUserToTask, removeUserFromTask, getUsersForTask, getTasksForUser } from "../models/usersTasksModel.js";

const assignUser = async (req, res) => {
    try {
        const { userId, taskId } = req.body
        console.log("Assigning user to task:", userId, taskId);
        const success = await assignUserToTask(userId, taskId);

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
    try{
        const { userId, taskId } = req.body
        const success = await removeUserFromTask(userId, taskId);

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
        const userId = req.params.userId
        const tasks = await getTasksForUser(userId)

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
        console.log("Fetching users for task:", taskId); // Debugging line
        const users = await getUsersForTask(taskId)

        if (!users) {
            return res.status(404).json({ error: "Users not found" })
        }

        res.json(users)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users for task" })
    }
}

export { assignUser, removeUser, getAllTasksForUser, getAllUsersForTask }