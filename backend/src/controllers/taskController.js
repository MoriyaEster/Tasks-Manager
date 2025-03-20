import { getTasks, getTaskById, createTask,updateTask, deleteTask } from "../models/taskModel.js";

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

const addTask = async (req, res) => {
  try {
    const { title, body, time, lane_id } = req.body
    const task = await createTask(title, body, time, lane_id)
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" })
  }
}

const editTask = async (req, res) => {
  const { id } = req.params
  const updates = req.body


  try {
    const success = await updateTask(id, updates)

    if (success) {
      res.json({ message: "Task updated successfully" })
    } else {
      res.status(404).json({ error: "Task not found" })
    }
  } catch (err) {
    console.error("Error patching task:", err);
    res.status(500).json({ error: "Failed to update task" })
  }
}

const removeTask = async (req, res) => {
  const { id } = req.params

  try {
    const success = await deleteTask(id);

    if (success) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
}



export { getAllTasks, getTask, addTask, editTask, removeTask }
