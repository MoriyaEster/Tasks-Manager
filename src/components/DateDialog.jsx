import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import { FormStyled, TitleStyled, InputStyled, ButtonStyled } from './styles/Dialog.styled';

export default function DateDialog(props) {

    const [date, setDate] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.handleDateChange(date);
        props.handleClose();
    }

    return (
        <Dialog onClose={props.handleClose} open={true}>
            <FormStyled onSubmit={handleSubmit}>
                <TitleStyled>Update Date</TitleStyled>
                <InputStyled type="date" required value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} />
                <ButtonStyled type="submit">Submit</ButtonStyled>
                <ButtonStyled type="button" onClick={props.handleClose}>Close</ButtonStyled>
            </FormStyled>
        </Dialog>
    )
}