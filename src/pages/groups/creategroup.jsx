import React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db } from "../../firebase-config";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, arrayRemove, arrayUnion, where } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";


export default function CreateGroup () {

    const [user, setUser] = useState({});
    const navi = useNavigate();

    useEffect(() => {
        const getUser = async () => {
           setUser(auth.currentUser);
        };
        getUser();
    });


   const createGroupButton = async () => {
        if (!user){
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
            <button onClick={goBackButton}>Go Back</button>
            <h1>CREATE GROUP</h1>
            <input placeholder="enter group name" id="groupNameInput"/>
            <input placeholder="enter interest" id="groupInterest"/>
            <input placeholder="enter a friend" id="enterFriendInput"/>
            <button onClick={createGroupButton}>Create group</button>
        </div>
    )
}