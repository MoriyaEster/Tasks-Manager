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

        const updatedTasks = [...tasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);

        console.log(localStorage.getItem("tasks"))

    }

    const deleteTask = (id) => {
        const task = tasks.find((task) => task.id === id)

        if (task) {
            const newTasks = tasks.filter((task) => task.id !== id)
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            setTasks(newTasks)
        }
    }

    const approveTask = (id) => {
        const task = tasks.find((task) => task.id === id)

        if (task && task.laneId !== 4) {
            const newTasks = tasks.filter((task) => task.id !== id)
            localStorage.setItem("tasks", JSON.stringify(newTasks.concat({ ...task, laneId: 4 })))
            setTasks(newTasks.concat({ ...task, laneId: 4 }))
        }
    }

    return { tasks, setTasks, addTask, deleteTask, approveTask }

}