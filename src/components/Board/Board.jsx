import React, { useState } from "react"
import "./Board.css"
import Lane from "../Lane/Lane"
import Popup from "../Popup/Popup"
import { nanoid } from 'nanoid'

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

function handleOnDragStart(event, id) {
    event.dataTransfer.setData("id", id)
}

function handleDragOver(event) {
    event.preventDefault()

}

export default function Board() {

    const [counterId, setCounterId] = useState(5)
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


    function handleOnDragEnd(event, laneId) {
        const id = parseInt(event.dataTransfer.getData("id"))

        const task = tasks.find((task) => task.id === id)

        if (task && task.laneId !== laneId) {
            const newTasks = tasks.filter((task) => task.id !== id)
            setTasks(newTasks.concat({ ...task, laneId }))
        }
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

    // console.log(new Date().toLocaleDateString())

    return (
        <div className="board">
            {lanes.map(lane => {
                return (
                    <Lane
                        key={nanoid()}
                        id={lane.id}
                        tittle={lane.tittle}
                        tasks={tasks.filter(task => task.laneId === lane.id)}
                        handleOnDragStart={handleOnDragStart}
                        handleDragOver={handleDragOver}
                        handleOnDragEnd={handleOnDragEnd}
                        handleApproveTask={handleApproveTask}
                        handleDeleteTask={handleDeleteTask}
                    />);
            })}
            {isPopupVisible &&
                <Popup
                    className="popup"
                    handleClosePopup={() => setIsPopupVisible(false)}
                    handleAddTask={handleAddTask}
                />
            }
            {!isPopupVisible &&
                <button
                    className="button-add-task"
                    onClick={handleOpenPopup}
                >+</button>
            }
        </div>
    )
}