import React from "react";
import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../../firebase-config";
import { db } from "../../firestore";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import CardList from "./cardlist";
import Navbar from "../../components/navbar";


export default function MyGroups () {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [ownedGroups, setOwnedGroups] = useState([]);

    const navi = useNavigate();

    const groupsCollectionReference = collection(db, "groups");

    const goToProfile = () => {
        navi("/user");
    }

    useEffect(() => {
        const getGroups = async () => {
            const queryJoinedGroups = query(groupsCollectionReference, where("members", "array-contains", auth.currentUser.email));
            const snapshotJoinedGroups = await getDocs(queryJoinedGroups);

            const queryOwnedGroups = query(groupsCollectionReference, where("owner", "==", auth.currentUser.email));
            const snapshotOwnedGroups = await getDocs(queryOwnedGroups);
          
            setJoinedGroups(snapshotJoinedGroups.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setOwnedGroups(snapshotOwnedGroups.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getGroups();
    }, []);


    return (
        <div>
            <Navbar></Navbar>
            <h1>MY GROUPS</h1>
            <br/>
            <br/>
            <h2>Joined Groups</h2>
            <CardList groups={joinedGroups}/>
            <h2>Owned Groups</h2>
            <CardList groups={ownedGroups}/>
        </div>
    )
}