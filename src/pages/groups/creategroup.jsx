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
        const groupName = document.getElementById("groupNameInput").value;
        const interest = document.getElementById("groupInterest").value;
        const location = document.getElementById("locationInput").value;
        //Algo for comma-separated memebers list
        const membersArray = document.getElementById("enterFriendInput").value.split(", ");

        if (groupName === "" || interest === "" || location === ""){
            console.log("Wrong input(s)");
            return;
        }

        await addDoc(collection(db, "groups"), {
            owner: auth.currentUser.email,
            groupName: groupName,
            interest: interest,
            location: location,
            members: membersArray,
            requests: []
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
                    
                    <TextField placeholder="enter group name*" variant="standard" id="groupNameInput" />
                    <TextField placeholder="enter interest*" variant="standard" id="groupInterest" />
                    <TextField placeholder="enter email of friend" variant="standard" id="enterFriendInput" />
                    <TextField placeholder="enter a location*" variant="standard" id="locationInput" />
                    <Button onClick={createGroupButton} variant="outlined">Create group</Button>
                </div>
            </div>
        </div>
    )
}