import express from "express";
import { loginUser, getAllUsers, getUserWithId, getUser, addUser, removeUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserWithId);
router.get("/username/:username", getUser)
router.post("/", addUser) //midelware
router.delete("/:id", removeUser)

export default router;
