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
    const navigate = useNavigate();
    // const [imgURL, setImgUrl] = useState("");
    // const [b64Img, setB64Img] = useState([]);
    const [articleType, setArticleType] = useState("");
    const [articlesToAdd, setArticlesToAdd] = useState([]);
    const { userID } = useParams();
    const [imgsToEncode, setImgsToEncode] = useState([]);

    function encodePic(file){
            let reader = new FileReader();
            reader.onloadend = function () {
                let result = (reader.result);
                upload(result);
            }
            reader.readAsDataURL(file);
            
    }

    const upload = (encodedImg) => {
            console.log("uploading image");
            let tempBase64 = encodedImg.slice(23); //23 is a magic number that eliminates extra charcaters in the base64 encoding that is left from the encode function. 
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
                console.log("upload complete");
            })
                .catch(err => console.log("XXX" + err))
    }

    const addArticle = () => {
        console.log(articlesToAdd);
        {articlesToAdd.map((article) => 
        axios.post('http://localhost:8000/api/article/new/' + userID,{
            type: article.type,
            imgURL: article.imgURL,
            userID: {userID}
        }, {withCredentials: true})
        .then(res => {console.log(res.data)
            navigate("/Closet/" + userID)
        })
        .catch(err => {console.log("XXX" + err + "XXX")})
        )}
    }

    function HandleUpload(e){
        e.preventDefault();
        for( let img of imgsToEncode){
            encodePic(img)
        }
    }

    return (
        <div >
            <NavBar>
                <form onSubmit={(e) => HandleUpload(e)}>
                    <SceneSelector onChange={(e) => setArticleType(e.target.value)}>
                        <option value="HeadWear">HeadWear</option>
                        <option value="Tops">Tops</option>
                        <option value="Bottoms">Bottoms</option>
                        <option value="FootWear">FootWear</option>
                    </SceneSelector>
                    <input type='file' multiple onChange = {(e) =>setImgsToEncode(e.target.files)}></input>
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