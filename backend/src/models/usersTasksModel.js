import db from "../config/db.js";

const assignUserToTask = async (user_name, task_id) => {
    try {
        const data = {
            username: user_name,
            taskId: task_id
        }
        const newConnection = await db("UsersTasks")
            .insert(data)
            .returning("*")
        return newConnection[0]
    } catch (err) {
        console.error("Error assigning user to task:", err);
    }
}

const removeUserFromTask = async (userName, taskId) => {
    try {
        const rowsAffected = await db("UsersTasks")
            .where({ userName, taskId })
            .del()
        return rowsAffected > 0
    } catch (err) {
        console.error("Error assigning user to task:", err);
    }
}

const getUsersForTask = async (taskId) => {
    try {
        const users = await db("UsersTasks as ut")
            .join("Users as u", "ut.username", "u.username")
            .where("ut.taskId", taskId)
            .select("u.id", "u.username");

        return users;
    } catch (err) {
        console.error("Error fetching users for task:", err);
    }
};

const getTasksForUser = async (userNmae) => {
    try {
        const tasks = await db("UsersTasks as ut")
            .join("Tasks as t", "ut.taskId", "t.id")
            .where("ut.username", userNmae)
            .select("t.id", "t.title", "t.body", "t.time", "t.lane_id")
        return tasks
    } catch (err) {
        console.error("Error fetching tasks for user:", err)
    }
}

const getTasksForUserByName = async (username) => {
    try {
        const tasks = await db("UsersTasks as ut")
            .join("Users as u", "ut.username", "u.name")
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
