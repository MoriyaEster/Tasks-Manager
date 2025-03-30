import express from "express";
import { getAllUsers, getUser, addUser, removeUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/", addUser) //midelware
router.delete("/user/:id", removeUser)

export default router;
