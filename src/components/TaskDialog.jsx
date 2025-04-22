import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { LabelStyled, TitleStyled, FormStyled, InputStyled, TextareaStyled, SelectStyled, ButtonStyled } from '../styles/Dialog.styled';

export default function TaskDialog(props) {
    const [title, settitle] = useState('');
    const [status, setStatus] = useState(1);
    const [body, setBody] = useState('');
    const [date, setDate] = useState('');

    function handleStatus(e) {
        const statusValue = e.target.value;
        switch (statusValue) {
            case 'TODO':
                setStatus(1);
                break;
            case 'in progress':
                setStatus(2);
                break;
            case 'Review':
                setStatus(3);
                break;
            case 'done':
                setStatus(4);
                break;
            default:
                setStatus(1);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(title, status, body, date);
        props.handleCloseDialog();
    }

    return (
        <Dialog open={props.open} onClose={props.handleCloseDialog}
            maxWidth="md"
            fullWidth>

            <TitleStyled>Add Task</TitleStyled>

            <FormStyled onSubmit={handleSubmit}>
                <LabelStyled>Title</LabelStyled>
                <InputStyled
                    type="text"
                    required
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                />

                <LabelStyled>Status</LabelStyled>
                <SelectStyled name='status' value={
                    status === 1 ? 'TODO' :
                    status === 2 ? 'in progress' :
                    status === 3 ? 'Review' :
                    'done'
                } onChange={handleStatus}>
                    <option value="TODO">TODO</option>
                    <option value="in progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="done">Done</option>
                </SelectStyled>

                <LabelStyled>Body</LabelStyled>
                <TextareaStyled
                    className="input-body"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></TextareaStyled>

                <LabelStyled>Date</LabelStyled>
                <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                />

                <ButtonStyled type="submit">Add</ButtonStyled>
                <ButtonStyled type="button" onClick={props.handleCloseDialog}>Close</ButtonStyled>
            </FormStyled>
        </Dialog>
    );
}

