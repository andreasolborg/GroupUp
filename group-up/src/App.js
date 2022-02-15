import React from 'react';
import { Routes ,Route,  BrowserRouter } from 'react-router-dom';
import history from './components/history.js';
import { Button } from 'react-bootstrap';



import Login from './pages/login/login';
import User from './pages/user/user';
import Homepage from './pages/homepage/homepage';
import Chat from './pages/chat/chat';
import Register from './pages/register/register';
import Matches from './pages/matches/matches';
import './App.css';



function App() {
  return (
    <><div className="Home-main">
      <h1>Link to Home Page</h1>
      <button onClick={() => history.push('/')}
        className="Home-button">View home</button>
    </div><div className="App">

        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/matches" element={<Matches />} />
          </Routes>
        </BrowserRouter>
      </div></>
  );
}
  

export default App;