import { sql } from "../config/db.js";

const getTasks = async () => {
  try {
    const result = await sql.query`SELECT * FROM tasks`;
    return result.recordset;
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
};

const getTaskById = async (taskId) => {
  try {
    const result = await sql.query`SELECT * FROM tasks WHERE id = ${taskId}`;
    return result.recordset[0];
  } catch (err) {
    console.error("Error fetching task:", err);
  }
}

const createTask = async (title, body, time, lane_id) => {
  try {
    const result = await sql.query`
      INSERT INTO tasks (title, body, time, lane_id)
      OUTPUT INSERTED.*
      VALUES (${title}, ${body}, ${time}, ${lane_id})
    `;
    return result.recordset[0]
  } catch (err) {
    console.error("Error creating task:", err)
  }
}

const updateTask = async (id, updates) => {

  try {
    const taskResult = await sql.query`SELECT * FROM tasks WHERE id = ${id}`;
    const task = taskResult.recordset[0]

    if (!task) {
      console.log("Task not found");
      return false;
    }

    const { title = task.title, body = task.body, time = task.time, lane_id = task.lane_id } = updates

    const result = await sql.query`
      UPDATE tasks 
      SET title = ${title}, lane_id = ${lane_id}
      WHERE id = ${id}
    `;
    return result.rowsAffected[0] > 0

  } catch (err) {
    console.error("Error patching task:", err)
    throw err
  }
}

const deleteTask = async (taskId) => {
  try {
    const result = await sql.query `DELETE FROM tasks WHERE id = ${taskId}`;
    return result.rowsAffected[0] > 0
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}


export { getTasks, getTaskById, createTask, updateTask, deleteTask };

