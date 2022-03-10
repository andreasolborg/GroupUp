import React from "react";
import { useState, useEffect } from "react";
import "./groups.css";
import { db } from "../../firestore";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import { getBottomNavigationUtilityClass, TextField } from "@mui/material";
import Card from "./card";
import { CardList } from "./cardlist";
import "./card.css";
import Button from '@material-ui/core/Button';
import Navbar from "../../components/navbar";



export default function Groups() {

    const [groups, setGroups] = useState([]);
    const [groupTemp, setGroupTemp] = useState([]);
    const groupsCollectionReference = collection(db, "groups");
    const navi = useNavigate();

    const goToMain = () => {
        navi("/user");
    }

  

    useEffect(() => {
        const getGroups = async () => {
            const querySnapshot = await getDocs(groupsCollectionReference);
            setGroups(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
            setGroupTemp(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
        
        };
        getGroups();
    }, []);

    const searchBarChanged = () => {
        var arrRes = [];
        groups.forEach((g) => {
            if (g.interest.toLowerCase().includes(document.getElementById("searchInput").value.toLowerCase()) &&
            g.location.toLowerCase().includes(document.getElementById("locationSearchInput").value)){
                arrRes.push(g);
            }
        });
        setGroupTemp(arrRes);  
    }
   

    return <div className="topOfGroups">
        <Navbar></Navbar>
        <h1>GROUPS PAGE</h1>
        <input id="searchInput" placeholder="search by interest..." onChange={() => {searchBarChanged()}}/>
        <input id="locationSearchInput" placeholder="search by location..." onChange={() => {searchBarChanged()}}/>
        <CardList groups={groupTemp}/>
    </div>
}
