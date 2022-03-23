import React from 'react';
import { Routes ,Route,  BrowserRouter } from 'react-router-dom';

import Login from './pages/login/login';
import User from './pages/user/user.jsx';
import Homepage from './pages/homepage/homepage';
import Matches from './pages/matches/matches';
import Navbar from './components/navbar.jsx';
import SignUp from './pages/signUp/signUp';
import Groups from './pages/groups/groups';
import MyGroups from './pages/groups/mygroups';
import Group from './pages/groups/group';
import CreateGroup from './pages/groups/creategroup';
import MatchPage from './pages/matches/matchpage';





function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/myGroups" element={<MyGroups />} />
            <Route path="/group/:id" element={<Group />} />
            <Route path="/creategroup" element={<CreateGroup />} />
            <Route path="/matchpage/:id" element={<MatchPage />} />
          </Routes>
        </BrowserRouter>
  );
}


export default App;