import { useState } from "react";

export default function useTask() {

    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || []
    })

    const [counterId, setCounterId] = useState((JSON.parse(localStorage.getItem("tasks")) || []).length)

    const addTask = (title, status, body, date) => {
        setCounterId((prev) => prev + 1)
        const newTask = {
            id: counterId,
            title: title,
            body: body,
            time: date,
            laneId: status
        }

        setTasks((tasks) => {
            const updatedTasks = [...tasks, newTask];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));

            return updatedTasks;
        })
    }

    const deleteTask = (id) => {
        const task = tasks.find((task) => task.id === id)

        if (task) {
            setTasks((tasks) => {
                const newTasks = tasks.filter((task) => task.id !== id)

                localStorage.setItem("tasks", JSON.stringify(newTasks));
                return newTasks;
            })
        }
    }

    const approveTask = (id) => {
        const task = tasks.find((task) => task.id === id)

        if (task && task.laneId !== 4) {
            setTasks((tasks) => {
                const newTasks = tasks.map((task) =>
                    task.id === id ? { ...task, laneId: 4 } : task
                )

                localStorage.setItem("tasks", JSON.stringify(newTasks));
                return newTasks;
            })
        }
    }

    return { tasks, setTasks, addTask, deleteTask, approveTask }

}