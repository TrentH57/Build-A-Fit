import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const navigate = useNavigate();
    return (
        <button onClick = {() => navigate("/home/4")}>To Closet</button>
    )
}

export default Login;