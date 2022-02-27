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
import "./footer.css";

const footer = () => {
    return (
        <AppBar position="static">
            <div className="footer">
                
            </div>
        </AppBar>
    );
};

export default footer;
