import { getTasks } from "../models/taskModel.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export { getAllTasks };
