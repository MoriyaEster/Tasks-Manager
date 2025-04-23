import { ExitButtonStyled, HeaderStyled, TitleHeaderStyled} from "../styles/Header.styled"
import { useLogin } from "../LoginContext";
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const {userName} = useLogin('')
    const navigate = useNavigate()

    function handleLogOut(){
        navigate('/login')
    }

    return (
        <HeaderStyled>
            <TitleHeaderStyled>{userName}'s Board</TitleHeaderStyled>
            <ExitButtonStyled typr="button" onClick={handleLogOut}>X</ExitButtonStyled>
        </HeaderStyled>
    )
}