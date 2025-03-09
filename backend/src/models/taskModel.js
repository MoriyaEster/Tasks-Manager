import { sql } from "../config/db.js";

const getTasks = async () => {
  try {
    const result = await sql.query`SELECT * FROM tasks`;
    return result.recordset;
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
};

export { getTasks };
