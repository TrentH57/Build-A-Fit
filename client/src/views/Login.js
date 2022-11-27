import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/loginForm';


const Login = (props) => {
    const navigate = useNavigate();
    return (
        <LoginForm/>
        // <button onClick = {() => navigate("/Closet/4")}>To Closet</button>
    )
}

export default Login;