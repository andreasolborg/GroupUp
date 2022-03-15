import React from "react";
import { useNavigate, useParams, route } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { db } from "../../firestore";
import { getBottomNavigationUtilityClass } from "@mui/material";
import Button from '@material-ui/core/Button';

import { collection, arrayRemove, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { ClassNames } from "@emotion/react";
import Navbar from "../../components/navbar";
import DateTimePicker from 'react-datetime-picker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import "./matchpage.css";
import { ConstructionOutlined, VaccinesRounded } from "@mui/icons-material";
import { roundToNearestMinutes } from "date-fns";



/**
 * KNOWN ERROR: Refreshing the page fucks it up
 * 
 * @returns 
 */
export default function Matchpage() {

    //Id of the group that this user owns, and will perform matching for
    const { id } = useParams();

    const groupsCollectionReference = collection(db, "groups");
    const groupRef = doc(db, "groups", id);

    const [groups, setGroups] = useState([]);
    const [head, setHead] = useState("not sat yet");
    const [rel, setRel] = useState(0);

    var headOfArray;
    var isReady;
    var queueArray = [];
    var bufferArray = [];
    var key = false;

    /**
     * Get all groups that this user does not own
     * 
     * Will create the foundation of the matching-queue, which will later be updated
     */
    useEffect(() => {
        const getAllGroups = async () => {
         //   const q = query(collection(db, "groups"), where("owner", "!=", auth.currentUser.email));
         //   const querySnapshot = await getDocs(q);
            const querySnapshot = await getDocs(groupsCollectionReference);
           
            setGroups(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
       
            console.log("GROUPS SIZE: ", groups.length);
        };
        getAllGroups();
    }, []); 

/*
    useEffect(() => {
        const getGroups = async () => {
            const querySnapshot = await getDocs(groupsCollectionReference);
            setGroups(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        };
        getGroups();

    }, []);
    */

   

    const reloadArray = async () => {
        const q = query(collection(db, "groups"), where("owner", "!=", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        setGroups(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        document.getElementById("gname").innerHTML = "Click 'NEXT' to begin matching";
    }




    const initQueue = async () => {
        await reloadArray();

    }



    const nextGroupButton = () => {
        /*    console.log("LENGTH FROM nextGroupButton: ", queueArray.length);
            if (queueArray.length === 0) {
                console.log("Arraylength is 0 - wtd");
                return;
            } */
         
        try {
            headOfArray = groups.shift();
            document.getElementById("gname").innerHTML = headOfArray.groupName;
            document.getElementById("ginterest").innerHTML = headOfArray.interest;
            document.getElementById("gdescription").innerHTML = headOfArray.description;
            document.getElementById("gdate").innerHTML = new Date(headOfArray.datetime.seconds * 1000);

            if (headOfArray.goldmatches.includes(id)) {
                document.getElementById("isMatched").innerHTML = "ALREADY MATCHED WITH GOLD";
            } else if (headOfArray.regmatches.includes(id)) {
                document.getElementById("isMatched").innerHTML = "ALREADY MATCHED";
            } else {
                document.getElementById("isMatched").innerHTML = "";
            }

        } catch (error) {
            console.error(error); //Check this one if the queue is very short
            document.getElementById("gname").innerHTML = "End of groups!";
            document.getElementById("ginterest").innerHTML = "Click refresh to re-loop";
            document.getElementById("gdescription").innerHTML = "";
            document.getElementById("gdate").innerHTML = "";
            document.getElementById("isMatched").innerHTML = "";
        }
    }


    /**
     * Current thought: Keep 2 arrays in firestore: 1) regular matches 2) gold matches. 
     * The two arrays should be maintained more or less the same, but with different priority protocol.
     * 
     * 
     * @param {boolean} isGoldMatch 
     */
    const matchWithGoup = async (isGold) => {
        //Get id of group on head
        const gref = doc(db, "groups", headOfArray.id);

        if (isGold) {
            await updateDoc(gref, {
                goldmatches: arrayUnion(id)
            });
        } else {
            await updateDoc(gref, {
                regmatches: arrayUnion(id)
            });
        }
        checkMutualMatch(id, headOfArray.id);
        if (isGold) {
            document.getElementById("isMatched").innerHTML = "MATCHED WITH GROUP USING GOLD";
        } else {
            document.getElementById("isMatched").innerHTML = "MATCHED WITH GROUP";
        }
        //await reloadArray();
    }



    const checkMutualMatch = async (ownGroupId, otherGroupId) => {
        const myGroupRef = doc(db, "groups", ownGroupId);
        const otherGroupRef = doc(db, "groups", otherGroupId);

        const myGroupSnap = await getDoc(myGroupRef);
        const otherGroupSnap = await getDoc(otherGroupRef);

        if (myGroupSnap.data().goldmatches.includes(otherGroupId) && otherGroupSnap.data().goldmatches.includes(ownGroupId)) {
            console.log("MUTUAL GOLD MATCH");
        } else if (myGroupSnap.data().regmatches.includes(otherGroupId) && otherGroupSnap.data().regmatches.includes(ownGroupId)) {
            console.log("MUTUAL REGULAR MATCH");
        } else {
            console.log("Not a mutual match");
        }

    }

    const unmatchButton = async () => {
        const gref = doc(db, "groups", headOfArray.id);
        await updateDoc(gref, {
            goldmatches: arrayRemove(id),
            regmatches: arrayRemove(id)
        }).then(() => {

        });
        document.getElementById("isMatched").innerHTML = "";
    }

    const logButton = () => {
        console.log("LOGGER! Size: ", queueArray.length);
        queueArray.map((m) => {
            console.log("LOG: ", m);
        });
    }


    return (
        <div>
            <Navbar />
            <h2>testing</h2>
            <button onClick={initQueue}>Refresh</button>
            <button id="reloadButton" onClick={reloadArray}>Reload Array</button>

            <div id="matchcard">
                <h1 id="gname">"Not sat yet</h1>
                <h2 id="ginterest">Not sat yet</h2>
                <p id="gdescription">Not sat yet</p>
                <h2 id="gdate">Not sat yet</h2>
                <h2 id="isMatched"></h2>
            </div>
            <button onClick={() => { nextGroupButton() }}>Next group</button>
            <button onClick={() => { matchWithGoup(true) }}>Match with GOLD</button>
            <button onClick={() => { matchWithGoup(false) }}>Match with Regular</button>
            <button onClick={() => { unmatchButton() }}>Unmatch (gold and regular)</button>
            <button onClick={() => { logButton() }}>Logger</button>
        </div>
    )
}