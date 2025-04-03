import { useState } from "react";

export default function useTask() {

    const getNextTaskId = () => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
        const maxId = storedTasks.length > 0 ? Math.max(...storedTasks.map(task => task.id)) : 0
        return maxId + 1
    }
    
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || [])
    const [counterId, setCounterId] = useState(() => getNextTaskId())
    
    const addTask = (title, status, body, date) => {
        const newId = getNextTaskId()
    
        const newTask = {
            id: newId,
            title,
            body,
            time: date,
            laneId: status
        };
    
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks, newTask]
            localStorage.setItem("tasks", JSON.stringify(updatedTasks))
            return updatedTasks;
        });
    
        setCounterId(newId + 1)
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