import { getTasks, getTaskById } from "../models/taskModel.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTasks()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
}

const getTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await getTaskById(taskId)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json(task)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" })
  }
}

export { getAllTasks, getTask }
