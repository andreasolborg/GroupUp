import React from 'react';
import { Routes ,Route,  BrowserRouter } from 'react-router-dom';
import history from './components/history.js';


import Login from './pages/login/login';
import User from './pages/user/user';
import Homepage from './pages/homepage/homepage';
import Chat from './pages/chat/chat';
import Register from './pages/register/register';
import Matches from './pages/matches/matches';
import Navbar from './components/navbar.jsx';
import './App.css';




function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/navbar" element={<Navbar />} />
          </Routes>
        </BrowserRouter>
  );
}
  

export default App;