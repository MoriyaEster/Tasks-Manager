import { sql } from "../config/db.js";

const assignUserToTask = async (userId, taskId) => {
    try {
        const result = await sql.query`
              INSERT INTO UsersTasks (user_id, task_id)
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
            DELETE FROM UsersTasks (user_id, task_id)
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
            SELECT u.id, u.name 
            FROM usersTasks ut
            JOIN users u ON ut.user_id = u.id
            WHERE ut.task_id = ${taskId}
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
            JOIN tasks t ON ut.task_id = t.id
            WHERE ut.user_id = ${userId}
        `;
        return result.recordset;
    }catch(err){
        console.error("Error fetching tasks for user:", err)
    }
}

export { assignUserToTask, removeUserFromTask, getUsersForTask, getTasksForUser }
