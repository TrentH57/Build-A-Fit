import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputWrapper from "./inputwrapper";
import FormWrapper from "./formwrapper";

const LoginForm = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

        const attemptRegistration = (e) => {
            e.preventDefault();
            let body = {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            }
            axios.post('http://localhost:8000/api/users/register', body, {withCredentials: true})
            .then(res => {navigate('/Closet/' + res.data.user._id)})
            .catch(err => {console.log(err)})
        }

return(
    <FormWrapper>
        <h1>Welcome</h1>
        <form onSubmit = {(e) => attemptRegistration(e)}>
            <InputWrapper>
                <label for="firstName">First Name:</label>
                <input type="text" value = {firstName} onChange = {(e) => setFirstName(e.target.value)}></input>
            </InputWrapper>
            <InputWrapper>
                <label for="firstName">Last Name:</label>
                <input type="text" value = {lastName} onChange = {(e) => setLastName(e.target.value)}></input>
            </InputWrapper>
            <InputWrapper>
                <label for="email">Email:</label>
                <input type="text" value = {email} onChange = {(e) => setEmail(e.target.value)}></input>
            </InputWrapper>
            <InputWrapper>
                <label for="password">Password:</label>
                <input type="password" value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
            </InputWrapper>
            <InputWrapper>
                <label for="firstName">Confirm Password:</label>
                <input type="password" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)}></input>
            </InputWrapper>
            <button>Register</button>
            
        </form>
        
    </FormWrapper>
)

}

export default LoginForm;