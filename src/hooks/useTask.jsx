import { useState, useEffect } from "react";
import axios from "axios";
import { url_tasks } from "../axios-handler";

export default function useTask() {

    const [tasks, setTasks] = useState([])

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(url_tasks)
                setTasks(response.data)
            } catch (err) {
                console.error("Error fetching tasks:", err)
            }
        };

        fetchTasks()
    }, [])

    // Add a new task
    const addTask = async (title, status, body, date) => {
        try {
            const response = await axios.post(url_tasks, {
                title,
                body,
                time: date,
                lane_id: status
            });

            const newTask = response.data
            setTasks((prev) => [...prev, newTask])
        } catch (err) {
            console.error("Error creating task:", err)
        }
    }

    // Delete a task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${url_tasks}${id}`)
            setTasks((prev) => prev.filter((task) => task.id !== id))
        } catch (err) {
            console.error("Error deleting task:", err)
        }
    }

    // Move task to "Done" (laneId = 4)
    const approveTask = async (id) => {
        const task = tasks.find((t) => t.id === id)
        if (!task || task.lane_id === 4) return

        try {
            await axios.patch(`${url_tasks}${id}`, { lane_id: 4 })

            setTasks((prev) =>
                prev.map((t) => (t.id === id ? { ...t, lane_id: 4 } : t))
            );
        } catch (err) {
            console.error("Error updating task:", err)
        }
    }

    return { tasks, setTasks, addTask, deleteTask, approveTask }

}