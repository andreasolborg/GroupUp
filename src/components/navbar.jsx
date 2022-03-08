import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import {Tabs, Tab, AppBar } from "@material-ui/core";
//import AppBar from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
//import ChatIcon from '@mui/icons-material/Chat';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Link } from "react-router-dom";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from './TekstLogo.svg';
//import { Badge } from "@mui/material";
//<Badge badgeContent={1000} color="error" id = "badge"></Badge>




import './navbar.css';

//import Directory from '../../components/directory/directory.component';


export default function IconTabs() {

    const currentTab = () => {
        const path = window.location.pathname
        if (path === "/matches") return 1
        else if (path === "/groups") return 2
        else if (path === "/chat") return 3
        else if (path === "/user") return 4
        
        
      }
     
    const [value, setValue] = React.useState(currentTab);
   

    const handleChange = (event, newValue) => {
        setValue(newValue);
   
  };

  

  return (
    <div className='Navbar'>
        <Tabs value={value} onChange={handleChange} aria-label="navbar">
            <Link to="/myGroups">
                <img margin-top = "20px" height="30px" id="groupUpLogo" src={logo}></img>
            </Link>
            <Tab icon={<FavoriteIcon />}  aria-label="matches" to = "/matches" component = {Link} id="navbarMatch"/>
            <Tab icon={<GroupIcon />}  aria-label="groups" to = "/groups" component = {Link} id="navbarGroup"/>
            <Tab icon={<ChatBubbleIcon />}  aria-label="chat" to = "/chat" component = {Link} id="navbarChat"/>
            <Tab icon={<PersonPinIcon />}  aria-label="person" iconPosition="end" label="Min profil" to="/user" component={Link} id="navbarUser"/>
            
        </Tabs>
    </div>
  );
}