import React, { useCallback } from "react"

export default function useDragAndDrop(tasks, setTasks) {

    const handleOnDragEnd = useCallback((event) => {
        const { active, over } = event

        if (!over) return

        const taskId = active.id
        const laneId = over.id

        setTasks((tasks) => {
            const updatedTasks = tasks.map((task) =>
                task.id === taskId ? { ...task, laneId: laneId } : task
            )
            
            localStorage.setItem("tasks", JSON.stringify(updatedTasks))

            return updatedTasks;
        });
    }, [setTasks])

    return { handleOnDragEnd }
}
