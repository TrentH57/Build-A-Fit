import React from 'react';
import Home from "./views/Home";
import Login from './views/Login';
import Closet from './views/Closet';
import Register from './views/Register';
import './App.css';
import{
  Routes,
  Route
}
from 'react-router-dom';
import NewArticle from './views/NewArticle';

function App() {
  return (
    <div>
      <Routes>
        <Route path = "" element={<Login />} />
        <Route path="/Register" element={<Register/>}/>
        <Route path = "/Home/:userID" element={<Home />} />
        <Route path = "/NewArticle/:userID" element={<NewArticle />} />
        <Route path = "/Closet/:userID" element = {<Closet />}/>
      </Routes>
    </div>
  );
}

export default App;
