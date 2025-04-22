import { useCallback } from "react"
import axios from "axios"
import { url_tasks } from "../axios-handler";

export default function useDragAndDrop(tasks, setTasks) {

    const handleOnDragEnd = useCallback(async (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const laneId = over.id;

        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) =>
                task.id === taskId ? { ...task, laneId: laneId } : task
            );
            return updatedTasks;
        });

        try {
            await axios.patch(`${url_tasks}${taskId}`, {lane_id: laneId})
        } catch (err) {
            console.error("Failed to update task on backend:", err);
        }
    }, [setTasks]);

    return { handleOnDragEnd }
}
