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


const Closet = (props) => {
    const navigate = useNavigate();
    const [allArticles, setAllArticles] = useState([]);
    const [displayArticles, setDisplayArticles] = useState([]);
    const { userID } = useParams();
    


    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
        .then(navigate("/"));
    }

    useEffect(() => {
        checkLoggedIn();
        axios.get('http://localhost:8000/api/articles/'+ userID, {withCredentials: true})
        .then(res =>  {{setAllArticles(res.data)}{setDisplayArticles(res.data)}})
        .catch(err => {console.log("XXX" + err + "XXX" + userID)})
        
    },[])

    const deleteArticle = (articleID) => {
        axios.delete('http://localhost:8000/api/article/' + articleID)
        .then(res => {
            removeFromDom(articleID)
        })
        .catch(err => console.error(err));
    }

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

    const setHeadWear = () => {
        let headWear = allArticles.filter(article => article.type === "HeadWear");
        setDisplayArticles(headWear)
    }
    const setTops = () => {
        let Tops = allArticles.filter(article => article.type === "Tops");
        setDisplayArticles(Tops)
    }
    const setBottoms = () => {
        let Bottoms = allArticles.filter(article => article.type === "Bottoms");
        setDisplayArticles(Bottoms)
    }
    const setFootWear = () => {
        let FootWear = allArticles.filter(article => article.type === "FootWear");
        setDisplayArticles(FootWear)
    }
    const removeFromDom = (articleID) => {
        setDisplayArticles(displayArticles.filter(article => article._id !== articleID));
    }
    return (
        <Wrapper>
            <PageHead>
                <h1>Your Racks</h1>
            </PageHead>
            <NavBar>
                <button onClick = {() => setHeadWear()}>HeadWear</button>
                <button onClick = {() => setTops()}>Tops</button>
                <button onClick = {() => setBottoms()}>Bottoms</button>
                <button onClick = {() => setFootWear()}>FootWear</button>
            </NavBar>
            <ClosetRack>
            {displayArticles.map((article, i) => 
                <ClosetImgDiv key = {article._id}>
                    <ClosetImg onClick= {() => navigate('/Closet/' + userID + '/' + article._id)} className = "closetimg" key = {article._id} src= {article.imgURL} alt = {article.imgURL}/>
                    <p className = "delete" >Remove From Rack</p>
                </ClosetImgDiv>

            )}
            </ClosetRack>
            <BottomNav>
                <div>
                    <button onClick = {() => navigate('/NewArticle/' + userID)}>Add Article</button>
                    <button onClick = {() => navigate('/Home/' + userID)}>Build Fits</button>
                </div>
                <button onClick = {() => logout()}>logout</button>
            </BottomNav>
        </Wrapper>
    )
}

export default Closet;