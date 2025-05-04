import { ExitButtonStyled, HeaderStyled, TitleHeaderStyled} from "../styles/Header.styled"
import { useUser } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const {userName, setUserName} = useUser('')
    const navigate = useNavigate()

    function handleLogOut(){
        setUserName('')
        navigate('/login')
    }

    return (
        <HeaderStyled>
            <TitleHeaderStyled>{userName}'s Board</TitleHeaderStyled>
            <ExitButtonStyled type="button" onClick={handleLogOut}>X</ExitButtonStyled>
        </HeaderStyled>
    )
}