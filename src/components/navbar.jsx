import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from "@mui/icons-material/AccountCircle";
import GroupIcon from '@material-ui/icons/Group';
import Button from "@mui/material/Button";
import { Badge } from "@mui/material";
import Box from '@mui/material/Box';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from './TekstLogo.svg';
import "./navbar.css";
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


const Navbar = () => {
    return (
        <AppBar position="static">
            <div className="navbar">
                <Link to="/home" className='linksNav' className="logo">
                    GROUP UP
                </Link>
                <Link to="/matches" className='linksNav'>
                <IconButton
                        color="inherit"
                        aria-label="show more">
                        <FavoriteIcon />
                    </IconButton>
                </Link>
                <Link to="/groups" className='linksNav'>
                        <IconButton size="large" aria-label="groups" color="inherit">
                            <Badge color="error">
                                <GroupIcon />
                            </Badge>
                        </IconButton>
                </Link>
                <Link to="/chat" className='linksNav'>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={1000} color="error">
                                <ChatBubbleIcon />
                            </Badge>
                        </IconButton>
                </Link>


                <Link to="/user" className='navbarUser'>
                    <IconButton
                        color="inherit"
                        size="large"
                        aria-label="show more">
                        <AccountCircle />
                    </IconButton>
                </Link>
            </div>
        </AppBar>
    );
};

export default Navbar;
