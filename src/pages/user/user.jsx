import React from "react";
import { useState, useEffect } from "react";

import "./user.css";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db } from "../../firebase-config";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";


export default function User() {

    const profileCollectionReference = collection(db, "profile");
    const [profiles, setProfiles] = useState([]);
    const [user, setUser] = useState({});

    const navi = useNavigate();


    useEffect(() => {
        const getProfiles = async () => {
            const data = await getDocs(profileCollectionReference);
            setProfiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            data.forEach((t) => {
                console.log(t.id);
                console.log(t.data());
                console.log(t.data().testAge);

            })
        };
        getProfiles();
    }, []);



    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const logout = async () => {
        console.log("test")
        await signOut(auth);
    };

    const deleteUser = async () => {
        await deleteDoc(doc(db, "profile", user.email));
        auth.currentUser.delete().then(() => {
            logout();
        }).catch((error) => {
            console.log("Error in deletion");
        });
    }

    const goToGroups = () => {
        navi("/groups");
    }

    const goToMyGroups = () => {
        navi("/mygroups");
    }

    return (
        <div className="user">
            <div className="top-part">
                <h1 className="username">{user?.email}</h1>
            </div>

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
            <Button variant="contained" id="btnLogOut" onClick={deleteUser}>
                Delete User
            </Button>
            <Button variant="contained" id="btnLogOut" onClick={goToGroups}>
                Go to groups
            </Button>
            <Button variant="contained" id="btnLogOut" onClick={goToMyGroups}>
                View my groups
            </Button>
        </div>
    );
};