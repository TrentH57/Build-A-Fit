import {react, useEffect, useState} from 'react';
import axios from 'axios';
import {useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import UploadArticle from '../components/uploadArticle';
import Wrapper from '../components/wrapper';


const NewArticle = (props) => {
    const { userID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checkLoggedIn();
    },[])

    const checkLoggedIn = () => {
        axios.get('http://localhost:8000/api/users/fetchcheckeduser', {withCredentials: true})
        .then(res =>   {
            if(res.data.results != userID){
            console.log(res.data.results + " < ---- > " + userID);
            navigate("/");
            }
            })
        .catch(err => navigate("/"))
    }

    return (
        <Wrapper>
            <UploadArticle />
        </Wrapper>
    )
}

export default NewArticle;