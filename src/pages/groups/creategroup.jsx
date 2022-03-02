import React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db } from "../../firebase-config";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, arrayRemove, arrayUnion, where } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import "./creategroup.css";




export default function CreateGroup() {

    const [user, setUser] = useState({});
    const navi = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            setUser(auth.currentUser);
        };
        getUser();
    });


    const createGroupButton = async () => {
        if (!user) {
            console.log("No user is currently signed in. Cannot create a group.");
            return;
        }
        await addDoc(collection(db, "groups"), {
            owner: auth.currentUser.email,
            groupName: document.getElementById("groupNameInput").value,
            interest: document.getElementById("groupInterest").value, //preset for now
            members: [document.getElementById("enterFriendInput").value]
        }).then((t) => {
            console.log("Created group!");
        }).catch((error) => {
            console.error(error);
        });
        goToGroup();
    }

    const goBackButton = () => {
        navi("/user");
    }

    const goToGroup = () => {
        navi("/mygroups");
    }

    return (
        <div>
            <Button onClick={goBackButton} variant="outlined" className="backBtn">Go Back</Button>
            <div className="groupForm">
                <div><h1>CREATE GROUP</h1></div>
                <div className="allInputs">
                    
                    <TextField placeholder="enter group name" variant="standard" id="textInput" />
                    <TextField placeholder="enter interest" variant="standard" id="textInput" />
                    <TextField placeholder="enter a friend" variant="standard" id="textInput" />
                    <Button onClick={createGroupButton} variant="outlined">Create group</Button>
                </div>
            </div>
        </div>
    )
}