import React, { useContext, useState } from "react";
import { TaskStyled, TimeStyled, TitleStyled, BodyStyled, ButtonStyled } from "./styles/Task.styled";
import { useDraggable } from "@dnd-kit/core";
import { TaskContext } from "./Board";
import DateDialog from "./DateDialog";


export default function Task(props) {

    const { approveTask, deleteTask } = useContext(TaskContext);

    const [date, setDate] = useState(props.time);
    const [updateDate, setUpdateDate] = useState(false);

    const handleDateChange = (date) => {
        
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = storedTasks.map(task =>
            task.id === props.id ? { ...task, time: date } : task)

        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        setDate(date)

    };

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
                <BodyStyled>{props.body}</BodyStyled>
            </div>

            <ButtonStyled onClick={() => deleteTask(props.id)}>Delete</ButtonStyled>
            <ButtonStyled onClick={() => approveTask(props.id)}>Approve</ButtonStyled>
            <ButtonStyled onClick={() => setUpdateDate(true)}>Update Date</ButtonStyled>


            {updateDate
                && <DateDialog open={updateDate} handleDateChange={handleDateChange} handleClose={handleClose} />}
            <TimeStyled>{date}</TimeStyled>
        </TaskStyled>
    )
}