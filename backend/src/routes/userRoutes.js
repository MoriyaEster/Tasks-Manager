import express from "express";
import { getAllUsers, getUser, addUser, removeUser } from "../controllers/userController.js";
import { createUserValidator } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/",createUserValidator, addUser) //midelware
router.delete("/:id", removeUser)

export default router;
