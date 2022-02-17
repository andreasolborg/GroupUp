import React from "react";

import "./user.css";
import Button from "@mui/material/Button";
import stringAvatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const User = () => {
    return (
        <div className="user">
            <h1 className="username"> Karan Singh Sandhu</h1>

            <AccountCircleIcon
                className="avatar"
                sx={{ width: 86, height: 86 }}
            ></AccountCircleIcon>

            <div className="interests">
                <h3>My Interests:</h3>
                <div className="myInterests">
                    <p>Interest 1</p>
                    <p>Interest 2</p>
                    <p>Interest 3</p>
                    <p>Interest 4</p>
                </div>
                <h3>Choose New Interests:</h3>
                <div className="newInterest">
                    <div>
                        <p>new Interest:</p>
                        <input id="" type="text" class="validate" />
                    </div>
                    <div>
                        <p>Change with:</p>
                        <input id="" type="text" class="validate" />
                    </div>
                    </div>

                    <Button variant="contained" id="btnSend">
                        CHANGE
                    </Button>
                    
            </div>

            <Button variant="contained" id="btnLogOut">
                Log out
            </Button>
        </div>
    );
};

/* 
<Link to="./user"> </Link>


<Avatar variant='circular'
sx={{ width: 54, height: 54 }}
>H</Avatar>
 */

export default User;
