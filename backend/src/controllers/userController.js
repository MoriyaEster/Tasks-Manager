import { getUsers, createUser, getUserById, deleteUser } from "../models/userModel.js"

const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" })
    }
}

const getUser = async (req, res) => {
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

const addUser = async (req, res) => {
    try {
        const { name } = req.body
        const user = await createUser(name)
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ error: "Failed to add task" })
    }
}

const removeUser = async (req, res) => {
    try {
        const userId = req.params.id
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

export { getAllUsers, getUser, addUser, removeUser }