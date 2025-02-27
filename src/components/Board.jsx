import React, { useState } from "react"
import {BoardStyled, ButtonAddTask} from "./styles/Board.styled"
import Lane from "./Lane"
import Popup from "./Popup"
import Dialog from '@mui/material/Dialog';
import { DndContext } from '@dnd-kit/core';

const lanes = [
    {
        id: 1,
        tittle: "To Do"
    },
    {
        id: 2,
        tittle: "In Proggress"
    },
    {
        id: 3,
        tittle: "Review"
    },
    {
        id: 4,
        tittle: "Done"

    }
]

export default function Board() {

    const [counterId, setCounterId] = useState(DEFAULT_COUNTER_TASKS)

    const [tasks, setTasks] = useState([
        {
            id: 1,
            tittle: "Task 1",
            body: "11111111111",
            time: "25/2/2025",
            laneId: 1
        },
        {
            id: 2,
            tittle: "Task 2",
            body: "222222222",
            time: "23/2/2025",
            laneId: 2
        },
        {
            id: 3,
            tittle: "Task 3",
            body: "3333333333333",
            time: "12/2/2025",
            laneId: 1
        },
        {
            id: 4,
            tittle: "Task 4",
            body: "44444444444444",
            time: "25/3/2025",
            laneId: 3

        }
    ])
    const [isPopupVisible, setIsPopupVisible] = useState(false)


    function handleOnDragEnd(event) {
        const { active , over } = event

        if (!over) return

        const taskId = active.id
        const laneId = over.id

        setTasks(() =>
            tasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        laneId: laneId
                    }
                    : task
            )
        )
    }

    function handleApproveTask(id) {

        const task = tasks.find((task) => task.id === id)

        if (task && task.laneId !== 4) {
            const newTasks = tasks.filter((task) => task.id !== id)
            setTasks(newTasks.concat({ ...task, laneId: 4 }))
        }
    }

    function handleDeleteTask(id) {
        console.log(id, typeof id)

        const task = tasks.find((task) => task.id === id)

        if (task) {
            const newTasks = tasks.filter((task) => task.id !== id)
            setTasks(newTasks)
        }
    }

    function handleAddTask(tittle, status, body, date) {
        setCounterId((prev) => prev + 1)
        const newTask = {
            id: counterId,
            tittle: tittle,
            body: body,
            time: date,
            laneId: status
        }
        setTasks((prev) => [...prev, newTask])
    }

    function handleOpenPopup() {
        setIsPopupVisible(true)
    }

    function handleClosePopup() {
        setIsPopupVisible(false)
    }


    // console.log(new Date().toLocaleDateString())

    return (
        <BoardStyled>
            <DndContext onDragEnd={handleOnDragEnd}>
                {lanes.map(lane => {
                    return (
                        <Lane
                            key={lane.id}
                            id={lane.id}
                            tittle={lane.tittle}
                            tasks={tasks.filter(task => task.laneId === lane.id)}
                            handleApproveTask={handleApproveTask}
                            handleDeleteTask={handleDeleteTask}
                        />);
                })}
            </DndContext>
            {isPopupVisible &&
                <Dialog onClose={handleClosePopup} open={true}>
                    <Popup
                        className="popup"
                        handleAddTask={handleAddTask}
                        handleClosePopup={handleClosePopup}
                    />
                </Dialog>}
            {!isPopupVisible &&
                <ButtonAddTask
                    onClick={handleOpenPopup}
                >+</ButtonAddTask>
            }
        </BoardStyled>
    )
}

const DEFAULT_COUNTER_TASKS = 5 