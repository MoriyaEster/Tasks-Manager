import React, { useState, createContext, useEffect } from "react"
import { BoardStyled, ButtonAddTask } from "../styles/Board.styled"
import Lane from "./Lane"
import TaskDialog from "./TaskDialog"
import { DndContext } from '@dnd-kit/core';
import useDragAndDrop from "../hooks/useDragAndDrop";
import useTask from "../hooks/useTask";
import { TaskContext } from "../context/TaskContext";

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

export default function Board() {

    const { tasks, setTasks, addTask, deleteTask, approveTask } = useTask()
    const { handleOnDragEnd } = useDragAndDrop(setTasks)

    const [isDialogVisible, setIsDialogVisible] = useState(false)

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