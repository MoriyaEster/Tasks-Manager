import React, { useState } from "react";
import { clsx } from "clsx"
import "./Task.css"
import Popup from "../Popup/Popup";
import PopupDate from "../Popup/PopupDate";

export default function Task(props) {

    const [time, setTime] = useState(props.time);
    const [updateDate, setUpdateDate] = useState(false);

    const handleTimeChange = (date) => {
        setTime(date);
    };

    const handleClosePopup = () => {
        setUpdateDate(false);
    }

    return (
        <div
            className={clsx("task", {
                late: time < new Date().toISOString().split('T')[0] && props.laneId !== 4,
                done: props.laneId === 4
            })
            }
            draggable
            onDragStart={(event) => props.handleOnDragStart(event, props.id)}
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