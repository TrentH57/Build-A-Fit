import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ClosetRack from '../components/closetRack';
import ClosetImg from '../components/closetImg';
import ClosetImgDiv from '../components/closetImgDiv';
import Wrapper from '../components/wrapper';
import "../components/componentstyles/deletebutton.css";
import PageHead from '../components/pageHead';


const Closet = (props) => {
    const navigate = useNavigate();
    const [allArticles, setAllArticles] = useState([]);
    const [displayArticles, setDisplayArticles] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/api/articles')
        .then(res => {setAllArticles(res.data)
        })
        .catch(err => {console.log("XXX" + err + "XXX")})
    },[])

    const deleteArticle = (articleID) => {
        axios.delete('http://localhost:8000/api/article/' + articleID)
        .then(res => {
            removeFromDom(articleID)
        })
        .catch(err => console.error(err));
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
        setDisplayArticles(displayArticles.filter(article => article._id != articleID));
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
                <button onClick = {() => navigate('/NewArticle/4')}>Add Article</button>
                <button onClick = {() => navigate('/Home/4')}>Build Fits</button>
            </NavBar>
            <ClosetRack>
            {displayArticles.map((article) => 
                <ClosetImgDiv>
                    <ClosetImg  onClick= {() => deleteArticle(article._id)} className = "closetimg" key = {article._id} src= {article.imgURL} alt = "cool picture"/>
                    <p className = "delete" >Remove From Rack</p>
                </ClosetImgDiv>

            )}
            </ClosetRack>
        </Wrapper>
    )
}

export default Closet;