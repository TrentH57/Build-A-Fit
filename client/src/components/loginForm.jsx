import React, { useState } from "react";
import axios from 'axios';
import { useNavigate,
    Link
 } from 'react-router-dom';
import InputWrapper from "./inputwrapper";
import FormWrapper from "./formwrapper";

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const attemptLogin = (e) => {
        e.preventDefault();
        // console.log({email}, {password});
        let body = {
            email, 
            password
        }
        axios.post('http://localhost:8000/api/users/login', body , {withCredentials: true})
        .then(res => {
            navigate('/Closet/' + res.data.user._id);
        })

        .catch(err => {console.log(err)})
    }

return(
    <FormWrapper>
        <h1>Welcome</h1>
        <form onSubmit = {(e) => attemptLogin(e)}>
            <InputWrapper>
                <label for="email">Email:</label>
                <input type="text" value = {email} onChange = {(e) => setEmail(e.target.value)}></input>
            </InputWrapper>
            <InputWrapper>
                <label for="password">Password:</label>
                <input type="text" value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
            </InputWrapper>
            <button>Login</button>
            <Link to={'/Register'}> Register to build your closet</Link>
            
        </form>
        
    </FormWrapper>
)

}

export default LoginForm;