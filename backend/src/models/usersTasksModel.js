import db from "../config/db.js";

const assignUserToTask = async (user_id, task_id) => {
    try {
        const data = {
            userId: user_id,
            taskId: task_id
        }
        const [newConnection] = await db("UsersTasks")
            .insert(data)
            .returning("")
        return true
    } catch (err) {
        console.error("Error assigning user to task:", err);
    }
}

const removeUserFromTask = async (userId, taskId) => {
    try {
        const rowsAffected = await db("UsersTasks")
            .where({ userId, taskId })
            .del()
        return rowsAffected > 0
    } catch (err) {
        console.error("Error assigning user to task:", err);
    }
}

const getUsersForTask = async (taskId) => {
    try {
        const users = await db("UsersTasks as ut")
            .join("Users as u", "ut.userId", "u.id")
            .where("ut.taskId", taskId)
            .select("u.id", "u.username")
        return users
    } catch (err) {
        console.error("Error fetching users for task:", err)
    }
}

const getTasksForUser = async (userId) => {
    try {
        const tasks = await db("UsersTasks as ut")
            .join("Tasks as t", "ut.taskId", "t.id")
            .where("ut.userId", userId)
            .select("t.id", "t.title", "t.body", "t.time", "t.lane_id")
        return tasks
    } catch (err) {
        console.error("Error fetching tasks for user:", err)
    }
}

const getTasksForUserByName = async (username) => {
    try {
        const tasks = await db("UsersTasks as ut")
            .join("Users as u", "ut.userId", "u.id")
            .join("Tasks as t", "ut.taskId", "t.id")
            .where("u.username", username)
            .select("t.id", "t.title", "t.body", "t.time", "t.lane_id")
        return tasks
    } catch (err) {
        console.error("Error fetching tasks for user:", err)
    }
}

const getAllConnections = async () => {
    try {
        const connections = await db("UsersTasks").select("*")
        return connections
    } catch (err) {
        console.error("Error fetching connections:", err); throw err
    }
}

export { assignUserToTask, removeUserFromTask, getUsersForTask, getTasksForUser, getTasksForUserByName, getAllConnections }
