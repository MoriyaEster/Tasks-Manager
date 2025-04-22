import { HeaderStyled, TitleStyled} from "../styles/Header.styled"
import { useLogin } from "../LoginContext";

export default function Header() {
    const {userName} = useLogin('');
    return (
        <HeaderStyled>
            <TitleStyled>{userName}'s Board</TitleStyled>
        </HeaderStyled>
    )
}