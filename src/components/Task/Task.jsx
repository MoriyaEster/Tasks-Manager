import React, { useState } from "react";
import { clsx } from "clsx"
import "./Task.css"
import Popup from "../Popup/Popup";
import PopupDate from "../Popup/PopupDate";
import { useDraggable } from "@dnd-kit/core";

export default function Task(props) {

    const [time, setTime] = useState(props.time);
    const [updateDate, setUpdateDate] = useState(false);

    const handleTimeChange = (date) => {
        setTime(date);
    };

    const handleClosePopup = () => {
        setUpdateDate(false);
    }

    const { attributes, listeners, setNodeRef, transform} = useDraggable ({
        id: props.id
    })

    const style = transform 
            ? {transform: `translate(${transform.x}px, ${transform.y}px)`} 
            : undefined

    return (
        <div
            className={clsx("task", {
                late: time < new Date().toISOString().split('T')[0] && props.laneId !== 4,
                done: props.laneId === 4
            })}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            <h2>{props.tittle}</h2>
            <h3>{props.body}</h3>
            <button
                className="delete-button"
                onClick={() => props.handleDeleteTask(props.id)}
            >
                Delete
            </button>
            <button
                className="approve-button"
                onClick={() => props.handleApproveTask(props.id)}
            >
                Approve
            </button>
            <button onClick={() => setUpdateDate(true)}>Update Date</button>
            {updateDate ?
                <PopupDate
                    handleTimeChange={handleTimeChange}
                    handleClosePopup={handleClosePopup} /> :
                <time>{time}</time>}

        </div >
    )
}