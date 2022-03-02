import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./groups.css";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { getBottomNavigationUtilityClass } from "@mui/material";
import Card from "./card";
import { CardList } from "./cardlist";
import Button from '@material-ui/core/Button';




//This page holds information on a particular group. 
//Could contain: List of members, ask-to-join button, owner of group, group-activity, 

export default function Group() {


     /**
     * id is used for determining wich group that has been entered. This group-id also makes the URL for that group-page.
     */
      const { id } = useParams();
  


    const navi = useNavigate();
    const [owner, setOwner] = useState("");
    const [interest, setInterest] = useState("");
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState([]);
    const [admin, setAdmin] = useState(false);

    const groupRef = doc(db, "groups", id);


    useEffect(() => {
        const getAdmin = async () => {
            const groupDocSnap = await getDoc(groupRef);
            if (groupDocSnap.data().owner == auth.currentUser.email) {
                console.log("if test: " +groupDocSnap.data().owner);
                setAdmin(true);
            } 
        }
        getAdmin();
    });

    useEffect(() => {
        const getOwner = async () => {
             const groupDocSnap = await getDoc(groupRef);
            setOwner(groupDocSnap.data().owner);

            setInterest(groupDocSnap.data().interest);
            setGroupName(groupDocSnap.data().groupName);
        };
        getOwner();
    });

    const getAdminElements = () => {
        console.log("GetAdmin");
        
        const ad = (<h1>string</h1>);

        return ad;
    }



    /**
     * navigates back to the user-page with useNavigate()
     */
    const goBackButton = () => {
        navi("/user");
    }

    return (
        <div>
            <button onClick={goBackButton}>Go Back</button>
            <h1>{owner}</h1>
            <h2>Interest: {interest}</h2>
            <h2>Members: TODO</h2>
            <div>{getAdminElements}</div>
            <Button onClick={getAdminElements} variant="contained">Admin</Button>
        </div>
    )
}
