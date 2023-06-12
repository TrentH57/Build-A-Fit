import React, { useState, useEffect } from 'react';
import {useParams } from "react-router";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ClosetRack from '../components/closetRack';
import ClosetImg from '../components/closetImg';
import ClosetImgDiv from '../components/closetImgDiv';
import Wrapper from '../components/wrapper';
import "../components/componentstyles/deletebutton.css";
import PageHead from '../components/pageHead';
import BottomNav from '../components/bottomNav';


const Article = (props) => {
    const navigate = useNavigate();
    const { userID } = useParams();
    const { articleID } = useParams();
    const [article, setArticle] = useState({});

    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
        .then(navigate("/"));
    }

    useEffect(() => {
        checkLoggedIn();
        axios.get('http://localhost:8000/api/article/'+ articleID, {withCredentials: true})
        .then(res =>  {{setArticle(res.data)}})
        .catch(err => {console.log("XXX" + err + "XXX" + userID)})
        
    },[])

    const checkLoggedIn = () => {
        axios.get('http://localhost:8000/api/users/fetchcheckeduser', {withCredentials: true})
        .then(res =>   {
            if(res.data.results !== userID){
            console.log(res.data.results + " < ---- > " + userID);
            navigate("/");
            }
            })
        .catch(err => navigate("/"))
    }

    const deleteArticle = () => {
        axios.delete('http://localhost:8000/api/article/' + articleID)
        .then(navigate('/Closet/' + userID));
        
    }

    return (
        <Wrapper>
            <PageHead>
                <h1>Item</h1>
            </PageHead>
            <ClosetRack>
                <ClosetImgDiv>
                    <ClosetImg  src= {article.imgURL} alt = {article.imgURL}></ClosetImg>
                </ClosetImgDiv>
                <p>{Date.parse(article.createdAt)}</p>
            </ClosetRack>
            <BottomNav>
                <div>
                    <button onClick = {() => navigate('/NewArticle/' + userID)}>Add Article</button>
                    <button onClick = {() => navigate('/Home/' + userID)}>Build Fits</button>
                </div>
                <button onClick = {() => deleteArticle()}>remove article</button>
                <button onClick = {() => logout()}>logout</button>
            </BottomNav>
        </Wrapper>
    )
}

export default Article;