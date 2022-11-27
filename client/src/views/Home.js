import React, { useState, useEffect } from 'react';
import {useParams } from "react-router";
import CoverFlow from "../components/coverFlow";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import axios from 'axios';
import Scene from '../components/scene';
import BottomNav from '../components/bottomNav';
import SceneSelector from '../components/sceneSelector';
const Home = (props) => {
    const navigate = useNavigate();
    const [headWearDisplay, setHeadWear] = useState([]);
    const [topsDisplay, setTops] = useState([]);
    const [bottomsDisplay, setBottoms] = useState([]);
    const [footWearDisplay, setFootWear] = useState([]);
    const [scene, setScene] = useState("");
    const { userID } = useParams();

    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
        .then(navigate("/"));
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/articles/' + userID, {withCredentials: true})
        .then(res => {
            let headWear =res.data.filter(article => article.type === "HeadWear")
            setHeadWear(headWear)
            let tops =res.data.filter(article => article.type === "Tops")
            setTops(tops)
            let bottoms =res.data.filter(article => article.type === "Bottoms")
            setBottoms(bottoms)
            let footWear =res.data.filter(article => article.type === "FootWear")
            setFootWear(footWear)
            setScene("https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg")
        })
        .catch(err => {console.log("XXX" + err + "XXX")})
    },[userID])

    return (
        <Scene bgImg ={scene}>
            <NavBar>
                <h1>Build-A-Fit</h1>
            </NavBar>
            <CoverFlow articlesToDisplay = {headWearDisplay}/>
            <CoverFlow articlesToDisplay = {topsDisplay}/>
            <CoverFlow articlesToDisplay = {bottomsDisplay}/>
            <CoverFlow articlesToDisplay = {footWearDisplay}/>
            <BottomNav>
                <div>
                    <SceneSelector onChange={(e) => setScene(e.target.value)}>
                        <option value="https://images.unsplash.com/photo-1602940659805-770d1b3b9911?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGltZXMlMjBzcXVhcmV8ZW58MHx8MHx8&w=1000&q=80">Downtown</option>
                        <option value="https://www.casadebalboa.com/custimages/slide1.jpg">Beach</option>
                        <option value="https://wallpaperaccess.com/full/1490265.jpg">Club</option>
                        <option value="https://c4.wallpaperflare.com/wallpaper/347/93/301/severance-concer-hall-in-clevel-wallpaper-preview.jpg">Concert Hall</option>
                        <option value="https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg">White</option>
                        <option value="https://wallpaperaccess.com/full/481679.jpg">Black</option>
                        <option value="https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-solid-color-on-gray-background-image_557017.jpg">Grey</option>
                        <option value="http://priscillanhk.com/images/IMAGE_bkgnd_DARK_BROWN_PAPER.gif">Brown</option>
                    </SceneSelector>
                    <button onClick = {() => navigate("/Closet/"+ userID)}>To Closet</button>
                </div>
                <button onClick = {() => logout()}>Logout</button>
            </BottomNav>
        </Scene>
    )
}

export default Home;