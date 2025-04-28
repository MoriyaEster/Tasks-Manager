import { useState } from 'react';
import { LoginStyled, LabelStyled, TitleStyled, FormStyled, InputStyled, ButtonStyled } from '../styles/Login.styled';
import { HeaderStyled, TitleHeaderStyled } from '../styles/Header.styled';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { url_users, url_get_user_by_name } from "../axios-handler";


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
            const user = await axios.get(url_get_user_by_name + userName)
            const checkThePasswordCorrect = user.data.password
            if (checkThePasswordCorrect === userPassword) {
                setUserPassword('')
                navigate('/home')
            } else {
                alert("Worng Password.")
            }
        } catch (err) {
            console.error("Error checking password:", err)
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