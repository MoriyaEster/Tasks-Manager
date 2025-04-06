import React, { useState, createContext, useEffect } from "react"
import { BoardStyled, ButtonAddTask } from "./styles/Board.styled"
import Lane from "./Lane"
import TaskDialog from "./TaskDialog"
import { DndContext } from '@dnd-kit/core';
import { use } from "react";
import useDragAndDrop from "./hooks/useDragAndDrop";
import useTask from "./hooks/useTask";
import axios from "axios";
import { url_tasks } from "../axios-handler";

const lanes = [
    {
        id: 1,
        title: "To Do"
    },
    {
        id: 2,
        title: "In Proggress"
    },
    {
        id: 3,
        title: "Review"
    },
    {
        id: 4,
        title: "Done"

    }
]

export const TaskContext = createContext();

export default function Board() {
    
    const { tasks, setTasks, addTask, deleteTask, approveTask } = useTask()
    const { handleOnDragEnd } = useDragAndDrop(tasks, setTasks)

    const [isDialogVisible, setIsDialogVisible] = useState(false)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(url_tasks)
                setTasks(response.data)
            } catch (error) {
                console.error("Failed to fetch tasks from backend:", error)
            }
        };
    
        fetchTasks();
    }, [tasks])

    function handleOpenDialog() {
        setIsDialogVisible(true)
    }

    function handleCloseDialog() {
        setIsDialogVisible(false)
    }

    return (
        <BoardStyled>
            <TaskContext.Provider value={{ approveTask, deleteTask }}>
                <DndContext onDragEnd={handleOnDragEnd}>
                    {lanes.map(lane => {
                        return (
                            <Lane
                                key={lane.id}
                                id={lane.id}
                                title={lane.title}
                                tasks={tasks.filter(task => task.lane_id === lane.id)}
                            />);
                    })}
                </DndContext>
            </TaskContext.Provider>
            {
                isDialogVisible &&
                <TaskDialog
                    open={true}
                    addTask={addTask}
                    handleCloseDialog={handleCloseDialog}
                />
            }
            {
                !isDialogVisible &&
                <ButtonAddTask
                    onClick={handleOpenDialog}
                >+</ButtonAddTask>
            }
        </BoardStyled >
    )
}