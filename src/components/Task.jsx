import React, { useState } from "react";
import { TaskStyled, TimeStyled, TitleStyled, BodyStyled, ButtonStyled } from "./styles/Task.styled";
import { useDraggable } from "@dnd-kit/core";
import Dialog from '@mui/material/Dialog';
import { Container } from "@mui/material";

export default function Task(props) {

    const [time, setTime] = useState(props.time);
    const [updateDate, setUpdateDate] = useState(false);

    const handleTimeChange = (date) => {
        setTime(date);
    };

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id
    })

    const style = transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : undefined

    // const late = time < new Date().toISOString().split('T')[0] && props.laneId !== 4

    // const done = props.laneId === 4



    return (
        <TaskStyled ref={setNodeRef} {...attributes} style={style}>
            {/* Draggable Area */}
            <div {...listeners}>
                <TitleStyled>{props.tittle}</TitleStyled>
                <BodyStyled>{props.body}</BodyStyled>
            </div>

            <ButtonStyled onClick={() => props.handleDeleteTask(props.id)}>Delete</ButtonStyled>
            <ButtonStyled onClick={() => props.handleApproveTask(props.id)}>Approve</ButtonStyled>
            <ButtonStyled onClick={() => setUpdateDate(true)}>Update Date</ButtonStyled>


            {updateDate ?
                <Dialog onClose={() => setUpdateDate(false)} open={updateDate}
                    handleTimeChange={handleTimeChange} /> :
                <TimeStyled>{time}</TimeStyled>}
        </TaskStyled>
    )
}