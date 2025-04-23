import styled from 'styled-components';

export const HeaderStyled = styled.div`
    background-color: #f1356d;
    font-size: xx-large;
    padding: 50px;
    text-align: center;
    color: #fff;
    position: relative; /* Allows children to be positioned absolutely */
    height: 60px; /* Or whatever height works well for your design */
`;

export const TitleHeaderStyled = styled.h1`
    margin-bottom: 30px;
    margin: 0; /* Optional: to avoid default margins interfering */
    line-height: 60px; /* Vertically center text in header */
`;

export const ExitButtonStyled = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    border: none;
    font-size: 30px;
    cursor: pointer;
    border-radius: 5px;
    padding: 6px 12px;
    background-color: transparent;
    color: white;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e0245e;
    }
`;
