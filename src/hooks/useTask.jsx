import { useState, useEffect } from "react";
import axios from "axios";
import { url_tasks, url_get_tasks_for_user_by_name, url_assign_task_to_user } from "../axios-handler";
import { useUser } from "../context/UserContext";


export default function useTask() {

    const [tasks, setTasks] = useState([])
    const { userName } = useUser()

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(url_get_tasks_for_user_by_name + userName)
                setTasks(response.data)
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log("No tasks found for this user.");
                } else {
                    console.error("Failed to fetch tasks from backend:", error);
                }
            }
        };

        fetchTasks()
    }, [userName])

    // Add a new task
    const addTask = async (title, status, body, date, users) => {

        try {
            const response = await axios.post(url_tasks, {
                title,
                body,
                time: date,
                lane_id: status
            });

            const newTask = response.data
            setTasks((prev) => [...prev, newTask])

            const allUsers = [...users, userName]

            for (const user of allUsers) {
                try {
                    await axios.post(url_assign_task_to_user, {
                        username: user,
                        taskId: newTask.id
                    })
                } catch (err) {
                    console.error("Error assigning task to user:", err)
                }
            }
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