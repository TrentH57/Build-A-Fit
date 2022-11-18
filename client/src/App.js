import React from 'react';
import Home from "./views/Home";
import Login from './views/Login';
import Closet from './views/Closet';
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
        <Route path = "/Home/:id" element={<Home />} />
        <Route path = "/NewArticle/:id" element={<NewArticle />} />
        <Route path = "/Closet/:id" element = {<Closet />}/>
      </Routes>
    </div>
  );
}

export default App;
