import express from "express";
import { getAllUsers, getUser, addUser, removeUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser) //midelware
router.delete("/:id", removeUser)

export default router;
