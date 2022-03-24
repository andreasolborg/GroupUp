import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, BrowserRouter, useLocation, Navigate } from 'react-router-dom';

import Login from './pages/login/login';
import User from './pages/user/user.jsx';
import Matches from './pages/matches/matches';
import Navbar from './components/navbar.jsx';
import SignUp from './pages/signUp/signUp';
import Groups from './pages/groups/groups';
import MyGroups from './pages/groups/mygroups';
import Group from './pages/groups/group';
import CreateGroup from './pages/groups/creategroup';
import MatchPage from './pages/matches/matchpage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';


function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setLoggedIn(true) : setLoggedIn(false);
    });
  }, []);

  return (
    <BrowserRouter>
      {loggedIn && <Navbar />}

      <Routes>
        <Route exact path="/" element={loggedIn ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/signUp" element={loggedIn ? <Navigate to="/home" replace /> : <SignUp />} />

        <Route path="/user" element={loggedIn ? <User /> : <Navigate to="/" replace />} />
        <Route path="/matches" element={loggedIn ? <Matches /> : <Navigate to="/" replace />} />
        <Route path="/groups" element={loggedIn ? <Groups /> : <Navigate to="/" replace />} />
        <Route path="/myGroups" element={loggedIn ? <MyGroups /> : <Navigate to="/" replace />} />
        <Route path="/group/:id" element={loggedIn ? <Group /> : <Navigate to="/" replace />} />
        <Route path="/creategroup" element={loggedIn ? <CreateGroup /> : <Navigate to="/" replace />} />
        <Route path="/matchpage/:id" element={loggedIn ? <MatchPage /> : <Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;