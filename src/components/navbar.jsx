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
import "./navbar.css";

const Navbar = () => {
    return (
        <AppBar position="static">
            <div className="Navbar">
                <Link to="/home" className='linksNav'>
                    GROUP UP
                </Link>
                <Link to="/matches" className='linksNav'>
                <IconButton
                        color="inherit"
                        aria-label="show more">
                        <GroupIcon/>
                    </IconButton>
                    
                </Link>
                <Link to="/chat" className='linksNav'>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
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
