import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LoginForm from '../components/loginForm';


const Login = (props) => {
    const navigate = useNavigate();
    // useEffect = () => {
    //     axios.get('http://localhost:8000/api/users/fetchcheckeduser', {withCredentials: true})
    //     .then(res =>   {console.log(res.data.results);})
    //     .catch(err => console.log(err))
    // }
    return (
        <LoginForm/>
        // <button onClick = {() => navigate("/Closet/4")}>To Closet</button>
    )
}

export default Login;