import styled from 'styled-components';

export const DialogStyled = styled.dialog`
    position: fixed;
    margin: 0 auto;
    text-align: center;
    top: 60%;
    left: 40%;
    background-color: #fff;
`;

export const LabelStyled = styled.label`
    display: block;
    text-align: left;
`;

export const TitleStyled = styled.h2`
    margin-bottom: 30px;
    color: #f1356d;
`;

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const InputStyled = styled.input`
    width: 100%;
    padding: 6px 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
`;

export const TextareaStyled = styled.textarea`
    width: 100%;
    padding: 6px 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
`;

export const SelectStyled = styled.select`
    width: 100%;
    padding: 6px 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
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
