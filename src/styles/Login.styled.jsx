import styled, { css } from 'styled-components';

export const LoginStyled = styled.div`

    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #f0f0f0;
`;

export const LabelStyled = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5em;
    font-weight: bold;
`;

export const TitleStyled = styled.h2`
    margin-top: 30px;
    color: #f1356d;
    font-size: 2em;
    display: flex;
    justify-content: center;
`;

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 15%;
`

export const InputStyled = styled.input`
    width: 100%;
    padding: 6px 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
    font-size: 1.8em;
`;

export const TextareaStyled = styled.textarea`
    width: 100%;
    padding: 6px 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
    font-family: 'Arial', sans-serif;
    font-size: 1.8em;
`;

export const SelectStyled = styled.select`
    width: 100%;
    padding: 6px 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
    display: flex;
    justify-content: center;
    font-size: 1.2em;
`;

export const ButtonStyled = styled.button`
    background-color: #f1356d;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px 0;
`;
