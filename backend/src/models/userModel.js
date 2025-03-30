import { sql } from "../config/db.js";

const getUsers = async () => {
    try {
      const result = await sql.query`SELECT * FROM Users`;
      return result.recordset;
    } catch (err) {
      console.error("Error fetching Users:", err);
    }
  }

const createUser = async (username) => {
    try {
        const result = await sql.query`
            INSERT INTO Users (username)
            VALUES (${username})
        `;
        return result.recordset[0]
    }
    catch (err) {
        console.error("Error creating user:", err)
    }
}

const getUserById = async (userId) => {
    try {
        const result = await sql.query`
            SELECT * FROM Users WHERE id = ${userId}
        `;
        return result.recordset[0];
    } catch (err) {
        console.error("Error fetching user:", err);
    }
}

const deleteUser = async (userId ) => {
    try{
        const result = await sql.query`
            DELETE FROM Users WHERE id = ${userId}
        `;
        return result.recordset[0];
    }
    catch(err){
        console.error("Error deleting user:", err);
    }
}

export { getUsers, createUser, getUserById, deleteUser }
