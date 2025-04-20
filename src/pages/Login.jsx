import { useState } from 'react';
import { LoginStyled, LabelStyled, TitleStyled, FormStyled, InputStyled, ButtonStyled } from './styles/Login.styled';
import { HeaderStyled } from './styles/Header.styled';

export default function Login() {

    const [user_name, setUserName] = useState('');
    const [user_password, setUserPassword] = useState('');

    function handleSubmit(e) {

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
                        value={user_name}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <LabelStyled>Password:</LabelStyled>
                    <InputStyled
                        type="password"
                        required
                        value={user_password}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />

                    <ButtonStyled type="login">Log in</ButtonStyled>
                    <ButtonStyled type="sign up">sign up</ButtonStyled>
                </FormStyled>
            </LoginStyled>
        </div>
    )
}