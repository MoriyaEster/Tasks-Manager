import { getUsers, createUser, getUserById, getUserByName, deleteUser } from "../models/userModel.js"
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';

const loginUser = async (req, res) => {
    try {
        console.log("req.body = ", req.body)
        const { username, password } = req.body;
        const user = await getUserByName(username);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Wrong Password" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ error: "Failed to login user" });
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" })
    }
}

const getUserWithId = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await getUserById(userId)

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.json(user)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user" })
    }
}

const getUserWithName = async (req, res) => {
    try {
        const userName = req.params.username
        const user = await getUserByName(userName)

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user" })
    }
}

const addUser = async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const { username, password } = req.body
        const user = await createUser(username, password)
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ error: "Failed to add task" })
    }
}

const removeUser = async (req, res) => {
    try {
        const userId = req.params.id
        console.log("Deleting user:", userId); // Debugging line
        const success = await deleteUser(userId);

        if (success) {
            res.json({ message: "user deleted successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Failed to delete user" });
    }
}

export { loginUser, getAllUsers, getUserWithId, getUserWithName as getUser, addUser, removeUser }