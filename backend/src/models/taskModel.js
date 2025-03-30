import { sql } from "../config/db.js";

const getTasks = async () => {
  try {
    const result = await sql.query`SELECT * FROM Tasks`;
    return result.recordset;
  } catch (err) {
    console.error("Error fetching Tasks:", err);
  }
};

const getTaskById = async (taskId) => {
  try {
    const result = await sql.query`SELECT * FROM Tasks WHERE id = ${taskId}`;
    return result.recordset[0];
  } catch (err) {
    console.error("Error fetching task:", err);
  }
}

const createTask = async (title, body, time, lane_id) => {
  try {
    const result = await sql.query`
      INSERT INTO Tasks (title, body, time, lane_id)
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
    const taskResult = await sql.query`SELECT * FROM Tasks WHERE id = ${id}`;
    const task = taskResult.recordset[0]

    if (!task) {
      console.log("Task not found");
      return false;
    }

    let updatequery = ``
    for (const key in updates) {
      if (UPDATE_FIELDS[key]) {
        updatequery += `${UPDATE_FIELDS[key]} = ${updates[key]}, `
      }
    }
    updatequery = updatequery.slice(0, -2)

    const { title = task.title, body = task.body, time = task.time, lane_id = task.lane_id } = updates

    console.log(`
      UPDATE Tasks 
      SET ${updatequery}
      WHERE id = ${id}
    `)

    console.log(typeof(updatequery))
    console.log(typeof(`UPDATE Tasks SET title =`))
    console.log(typeof(`UPDATE Tasks SET title = ${title}`))
    console.log(typeof(title))

    // console.log(
    // `UPDATE Tasks 
    //   SET title = ${title}, body = ${body}, time = ${time}, lane_id = ${lane_id}
    //   WHERE id = ${id}`
    // )



    const long = `
      title = ${title}, body = ${body}, time = ${time}, lane_id = ${lane_id}
      WHERE id = ${id}
    `

    const short = `
      ${updatequery}
      WHERE id = ${id}
    `

    console.log(long === short)

    const result = await sql.query`
    UPDATE Tasks 
    SET ${updatequery}
    WHERE id = ${id}
  `;

    // const result = await sql.query`
    //   UPDATE Tasks 
    //   SET ${updatequery}
    //   WHERE id = ${id}
    // `;

    return result.rowsAffected[0] > 0

  } catch (err) {
    console.error("Error patching task:", err)
    throw err
  }
}

const deleteTask = async (taskId) => {
  try {
    const result = await sql.query`DELETE FROM Tasks WHERE id = ${taskId}`;
    return result.rowsAffected[0] > 0
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}


export { getTasks, getTaskById, createTask, updateTask, deleteTask };

const UPDATE_FIELDS = {
  title: `title`,
  body: `body`,
  time: `time`,
  lane_id: `lane_id`
}

//להשתמש בכל ה server 