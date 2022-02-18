import React from "react";
import { useState } from "react";

import "./user.css";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../../firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function User() {
    
    const logout = async () => {
        console.log("test")
        await signOut(auth);
    };

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
                        <input id="" type="text" />
                    </div>
                    <div>
                        <p>Change with:</p>
                        <input id="" type="text" />
                    </div>
                    </div>

                    <Button variant="contained" id="btnSend" >
                        CHANGE
                    </Button>
                    
            </div>

            <Button variant="contained" id="btnLogOut" onClick={logout}>
                Log out
            </Button>
        </div>
    );
};