import React, { useContext, useEffect, useState } from "react";
import { TaskStyled, TimeStyled, TitleStyled, BodyStyled, ButtonStyled, UserListStyled, UserItemStyled } from "../styles/Task.styled";
import { useDraggable } from "@dnd-kit/core";
import { TaskContext } from "../context/TaskContext";
import DateDialog from "./DateDialog";
import axios, { all } from "axios";
import { url_tasks, url_users, url_get_users_for_task } from "../axios-handler";


export default function Task(props) {

    const { approveTask, deleteTask } = useContext(TaskContext);

    const [date, setDate] = useState(props.time);
    const [updateDate, setUpdateDate] = useState(false);

    const [allUsers, setAllUsers] = useState([])
    const [usersConnected, setUsersConnected] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const allUsersResponse = await axios.get(url_users)
                setAllUsers(allUsersResponse.data)
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log("No users found.");
                } else {
                    console.error("Failed to fetch users from backend:", error);
                }
            }
        }
        fetchAllUsers()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const url = url_get_users_for_task.replace("{taskId}", props.id);
                const usersForTasks = await axios.get(url)
                setUsersConnected(usersForTasks.data)
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setUsers([])
                } else {
                    console.error("Failed to fetch users from backend:", error);
                }
            }
        }
        fetchUsers()
    }, [])

    const handleDateChange = async (newDate) => {
        try {
            await axios.patch(`${url_tasks}${props.id}`,
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

    const handleChangeUsers = (e) => {
        const { checked, value } = e.target;
        const selectedUser = allUsers.find(u => u.username === value);
        if (!selectedUser) return;

        setUsersConnected(prev =>
            checked
                ? [...prev, selectedUser]
                : prev.filter(u => u.username !== value)
        );
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
            <TimeStyled>{date?.split('T')[0]}</TimeStyled>

            <UserListStyled>
                {allUsers.map((user) => (
                    <UserItemStyled key={user.id}>
                        <input
                            type="checkbox"
                            value={user.username}
                            checked={usersConnected.some((u) => u.username === user.username)}
                            onChange={handleChangeUsers}
                        />
                        {user.username}
                    </UserItemStyled>
                ))}
            </UserListStyled>
        </TaskStyled>
    )
}