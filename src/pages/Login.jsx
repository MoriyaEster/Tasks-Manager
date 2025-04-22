import { useState } from 'react';
import { LoginStyled, LabelStyled, TitleStyled, FormStyled, InputStyled, ButtonStyled } from '../styles/Login.styled';
import { HeaderStyled } from '../styles/Header.styled';
import { useLogin } from '../LoginContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { url_tasks } from "../axios-handler";


export default function Login() {

    const {userName, setUserName} = useLogin('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
      
        if (userName.trim() === "" || userPassword.trim() === "") {
          alert("Please fill in both fields.")
          return;
        }
      
        navigate('/home')
      }

    return (
        <div className="login">
            <HeaderStyled>
                <h1>Login</h1>
            </HeaderStyled>
            <LoginStyled>
                <TitleStyled>Hello, Please login</TitleStyled>
                <FormStyled onSubmit={handleSubmit}>
                    <LabelStyled>Name:</LabelStyled>
                    <InputStyled
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <LabelStyled>Password:</LabelStyled>
                    <InputStyled
                        type="password"
                        required
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />

                    <ButtonStyled type="submit">Log in</ButtonStyled>
                    <ButtonStyled type="button">sign up</ButtonStyled>
                </FormStyled>
            </LoginStyled>
        </div>
    )
}