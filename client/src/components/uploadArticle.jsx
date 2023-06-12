import React, { useState } from "react";
import {useParams } from "react-router";
import axios from 'axios';
import ClosetImg from "./closetImg";
import { useNavigate } from 'react-router-dom';
import ClosetRack from "./closetRack";
import SceneSelector from "./sceneSelector";
import "./componentstyles/inputStyle.css"; 
import "./componentstyles/button.css";
import BottomNav from "./bottomNav";
import NavBar from "./NavBar";
import PageHead from "./pageHead";

const UploadArticle = (props) => {
    const { userID } = useParams();
    const navigate = useNavigate();
    // const [imgURL, setImgUrl] = useState("");
    const [b64Img, setB64Img] = useState();
    const [articleType, setArticleType] = useState("");
    const [articlesToAdd, setArticlesToAdd] = useState([]);

    const encodePic = (e, file) => {
        e.preventDefault();
        let reader = new FileReader();
        reader.onloadend = function () {
            let result = (reader.result);
            setB64Img(result);
            console.log("set");
        }
        reader.readAsDataURL(file);
    }

    const addArticle = () => {
        let date = new Date();
        let dateAdded = (date.getMonth()+1) + "-" + date.getDate() + "-" + date.getFullYear();
        {articlesToAdd.map((article) => 
        axios.post('http://localhost:8000/api/article/new/' + userID,{
            type: article.type,
            imgURL: article.imgURL,
            userID: {userID},
            addedToCloset: dateAdded
        }, {withCredentials: true})
        .then(res => {console.log(res.data)
            navigate("/Closet/" + userID)
        })
        .catch(err => {console.log("XXX" + err + "XXX")})
        )}
    }

    const upload = (e) => {
        let tempBase64 = b64Img.slice(23);
        e.preventDefault();
        let data = {
            key: 'e2cdf0a47902483877ad3a5b62731ab8',
            image: tempBase64
        }
        axios({
            method: 'post',
            url: "https://api.imgbb.com/1/upload",
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => { setArticlesToAdd([...articlesToAdd, {type: articleType, imgURL: res.data.data.display_url}])
            console.log(articleType);
        })
            .catch(err => console.log("XXX" + err))
    }

    return (
        <div >
            <NavBar>
                <form onSubmit={(e) => upload(e)}>
                    <SceneSelector onChange={(e) => setArticleType(e.target.value)}>
                        <option value="HeadWear">HeadWear</option>
                        <option value="Tops">Tops</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="FootWear">FootWear</option>
                    </SceneSelector>
                    <input type='file' onChange={(e) => encodePic(e, e.target.files[0])}></input>
                    <button>Click to Upload</button>
                </form>
            </NavBar>
            <PageHead>
                <h1> Your Haul </h1>
            </PageHead>
            <ClosetRack>
                {articlesToAdd.map((article) => 
                    <ClosetImg key = {article._id} src= {article.imgURL} alt = "cool picture"/>
                )}
            </ClosetRack>
            <BottomNav>
                <button onClick={() => navigate('/Closet/' + userID)}>Back to Closet</button>
                <button onClick ={() => addArticle()}>Add to Closet</button>
            </BottomNav>
        </div>
    );
}

export default UploadArticle;