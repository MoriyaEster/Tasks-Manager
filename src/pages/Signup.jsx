import { LoginStyled, LabelStyled, TitleStyled, FormStyled, InputStyled, ButtonStyled } from '../styles/Login.styled';
import { HeaderStyled, TitleHeaderStyled } from '../styles/Header.styled';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { url_users } from "../axios-handler";


export default function Signup() {

    const { userName, setUserName } = useUser('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()

        if (userName.trim() === "") {
            alert("Please fill in both fields.")
            return;
        }

        // Check if the user already exists
        try {
            const responseAllUssers = await axios.get(url_users)
            const userExists = responseAllUssers.data.some(user => user.username === userName)
            if (userExists) {
                alert("User already exists. Please choose a different name.");
            } else {
                try {
                    await axios.post(url_users, { username: userName, password: userPassword });
                    alert("User created successfully.");
                    navigate('/home');
                } catch (err) {
                    console.error("Error creating user:", err)
                }
            }
        } catch (err) {
            console.error("Error checking user:", err);
        }

    }

    return (
        <div className="signup">
            <HeaderStyled>
                <TitleHeaderStyled>Signup</TitleHeaderStyled>
            </HeaderStyled>
            <LoginStyled>
                <TitleStyled>Hello, Please Signup</TitleStyled>
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

                    <ButtonStyled type="submit">sign up</ButtonStyled>
                </FormStyled>
            </LoginStyled>
        </div>
    )
}