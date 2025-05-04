import { useState } from 'react';
import { LoginStyled, LabelStyled, TitleStyled, FormStyled, InputStyled, ButtonStyled } from '../styles/Login.styled';
import { HeaderStyled, TitleHeaderStyled } from '../styles/Header.styled';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { url_login } from "../axios-handler";


export default function Login() {

    const { userName, setUserName } = useUser('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()

        if (userName.trim() === "" || userPassword.trim() === "") {
            alert("Please fill in both fields.")
            return;
        }
        try {
            const response = await axios.post(url_login, {
                username: userName,
                password: userPassword
            });

            alert("Login successful");
            setUserPassword('');
            navigate('/home');
        } catch (err) {
            if (err.response?.status === 401) {
                alert("Incorrect password.");
            } else if (err.response?.status === 404) {
                alert("User not found.");
            } else {
                console.error("Error logging in:", err);
            }
        }
    }

    return (
        <div className="login">
            <HeaderStyled>
                <TitleHeaderStyled>Login</TitleHeaderStyled>
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
                    <ButtonStyled type="button" onClick={() => { navigate('/signup') }}>sign up</ButtonStyled>
                </FormStyled>
            </LoginStyled>
        </div>
    )
}