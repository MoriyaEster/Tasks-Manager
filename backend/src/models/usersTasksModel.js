import { sql } from "../config/db.js";

const assignUserToTask = async (userId, taskId) => {
    console.log("Assigning user to task:", userId, taskId);
    try {
        const result = await sql.query`
              INSERT INTO UsersTasks (userId, taskId)
              VALUES (${userId}, ${taskId})
            `;
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error("Error assigning user to task:", err);
    }
}

const removeUserFromTask = async (userId, taskId) => {
    try {
        const result = await sql.query`
            DELETE FROM UsersTasks (userId, taskId)
              VALUES (${userId}, ${taskId})
            `;
        return result.rowsAffected[0] > 0;
    } catch (err) {
        console.error("Error assigning user to task:", err);
    }
}

const getUsersForTask = async (taskId) => {
    try {
        const result = await sql.query`
            SELECT u.id, u.username 
            FROM usersTasks ut
            JOIN users u ON ut.userId = u.id
            WHERE ut.taskId = ${taskId}
        `;
        return result.recordset;
    }catch(err){
        console.error("Error fetching users for task:", err)
    }
}

const getTasksForUser = async (userId) => {
    try {
        const result = await sql.query`
            SELECT t.id, t.title, t.body, t.time, t.lane_id
            FROM usersTasks ut
            JOIN tasks t ON ut.taskId = t.id
            WHERE ut.userId = ${userId}
        `;
        return result.recordset;
    }catch(err){
        console.error("Error fetching tasks for user:", err)
    }
}

export { assignUserToTask, removeUserFromTask, getUsersForTask, getTasksForUser }
