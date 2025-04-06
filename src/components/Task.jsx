import React, { useContext, useState } from "react";
import { TaskStyled, TimeStyled, TitleStyled, BodyStyled, ButtonStyled } from "./styles/Task.styled";
import { useDraggable } from "@dnd-kit/core";
import { TaskContext } from "./Board";
import DateDialog from "./DateDialog";
import axios from "axios";
import { url_tasks } from "../axios-handler";


export default function Task(props) {

    const { approveTask, deleteTask } = useContext(TaskContext);

    const [date, setDate] = useState(props.time);
    const [updateDate, setUpdateDate] = useState(false);

    const handleDateChange = async (newDate) => {
        try {
            await axios.patch(`${ url_tasks }${ props.id }`,
                { time: newDate });
            setDate(newDate);
            // Optionally update the task in Board's task list:
            if (props.updateTaskInState) {
                props.updateTaskInState(props.id, { time: newDate });
            }
        } catch (err) {
            console.error("Error updating task time:", err);
        }
    }

    const handleClose = () => {
        setUpdateDate(false);
    };


    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id
    })

    const style = transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : undefined

    // const late = (date < new Date().toISOString().split('T')[0] && props.laneId !== 4).toString()

    // const done = (props.laneId === 4).toString()



    return (
        <TaskStyled ref={setNodeRef} {...attributes} style={style}>
            <div {...listeners}>
                <TitleStyled>{props.title}</TitleStyled>
                <h3>{props.id}</h3>
                <BodyStyled>{props.body}</BodyStyled>
            </div>

            <ButtonStyled onClick={() => deleteTask(props.id)}>Delete</ButtonStyled>
            <ButtonStyled onClick={() => approveTask(props.id)}>Approve</ButtonStyled>
            <ButtonStyled onClick={() => setUpdateDate(true)}>Update Date</ButtonStyled>


            {updateDate
                && <DateDialog open={updateDate} handleDateChange={handleDateChange} handleClose={handleClose} />}
            <TimeStyled>{date?.split('T')[0]}</TimeStyled>
        </TaskStyled>
    )
}