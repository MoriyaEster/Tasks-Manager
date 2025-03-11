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

export { getTasks, getTaskById };

