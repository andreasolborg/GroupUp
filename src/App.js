import React from 'react';
import { Routes ,Route,  BrowserRouter } from 'react-router-dom';
import history from './components/history.js';


import Login from './pages/login/Login';
import User from './pages/user/user.jsx';
import Homepage from './pages/homepage/homepage';
import Chat from './pages/chat/chat';
import Matches from './pages/matches/matches';
import Navbar from './components/navbar.jsx';
import SignUp from './pages/signUp/SignUp';




function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/home" element={<Homepage />} />
            <Route path = "/chat" element = {<Chat/>}/>
            <Route path="/matches" element={<Matches />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
  );
}


export default App;