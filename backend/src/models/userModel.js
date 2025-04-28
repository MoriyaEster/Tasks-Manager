import db from "../config/db.js";

const getUsers = async () => {
    try {
        const Users = await db("Users").select("*")
        return Users
    } catch (err) {
        console.error("Error fetching Users:", err);
    }
}

const createUser = async (username, password) => {
    try {
        const data = {
            [USER_FIELDS.username]: username,
            [USER_FIELDS.password]: password
        }
        const newUser = await db("Users")
            .insert(data)
            .returning("*")
        return newUser[0]
    }
    catch (err) {
        console.error("Error creating user:", err)
    }
}

const getUserById = async (userId) => {
    try {
        const user = await db("Users").where({ id: userId }).first()
        return user
    } catch (err) {
        console.error("Error fetching user:", err);
    }
}

const getUserByName = async (userName) => {
    try {
        const user = await db("Users").where({ username: userName }).first()
        return user
    } catch (err) {
        console.error("Error fetching user:", err);
    }
}

const deleteUser = async (userId) => {
    try {
        const rowsAffected = await db("Users").where({ id: userId }).del()
        return rowsAffected > 0
    }
    catch (err) {
        console.error("Error deleting user:", err);
    }
}

export { getUsers, createUser, getUserById, getUserByName, deleteUser }

const USER_FIELDS = {
    username: "username",
    password: "password"
}
