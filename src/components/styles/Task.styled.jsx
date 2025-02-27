import styled, { css } from 'styled-components';

export const TaskStyled = styled.div`
    background-color: white;
    border-radius: 10px;
    border: 2px solid gray;
    margin: 10px;
    padding: 10px;
`;

export const TimeStyled = styled.time`
    font-size: 1.2em;
`;

export const TitleStyled = styled.h1`
    font-size: 1.5em;
    font-weight: bold;
    margin: 10px 0;
`;

export const BodyStyled = styled.p`
    font-size: 1em;
    margin: 10px 0;
`;

export const ButtonStyled = styled.button`
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    pointer-events: auto;
    user-select: auto;

    &:hover {
        background-color: darkblue;
    }
`;