import Header from "../components/Header";
import Board from "../components/Board";
import { useLogin } from "../LoginContext";


export default function Home() {
    
    const {userName} = useLogin('');

    return (
        <div className="home">
            <Header />
            <Board />
        </div>
    )
}