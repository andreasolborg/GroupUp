import React from "react";
import { useState, useEffect } from "react";
import "./groups.css";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import { getBottomNavigationUtilityClass } from "@mui/material";
import Card from "./card";
import { CardList } from "./cardlist";


export default function Groups() {

    const [groups, setGroups] = useState([]);
    const groupsCollectionReference = collection(db, "groups");
    const navi = useNavigate();

    const goToMain = () => {
        navi("/user");
    }

  

    useEffect(() => {
        const getGroups = async () => {
            const querySnapshot = await getDocs(groupsCollectionReference);
            setGroups(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        
        };
        getGroups();
    }, []);



    return <div>
        <h1>GROUPS PAGE</h1>
        <button onClick={() => {goToMain()}}>Go To Profile</button>
        <CardList groups={groups}/>
    </div>
}

