import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import Navbar from "../../components/navbar";
import { db } from "../../firestore";
import { collection, arrayRemove, getDocs, updateDoc, doc, getDoc, arrayUnion } from 'firebase/firestore'
import "./matchpage.css";


/**
 * KNOWN ERROR: Refreshing the page fucks it up
 * 
 * @returns 
 */
export default function Matchpage() {

    //Id of the group that this user owns, and will perform matching for
    const { id } = useParams();

    const groupsCollectionReference = collection(db, "groups");

    const [groups, setGroups] = useState([]);

    const [displayedGroup, setDisplayedGroup] = useState({});


    /**
     * Get all groups that this user does not own
     * 
     * Will create the foundation of the matching-queue, which will later be updated
     */
    useEffect(() => {
        updateGroups();
    }, []); 


    /**
     * Sets the starting values for the groups and displayedgroup hooks
     */
    const updateGroups = async () => {
        const querySnapshot = await getDocs(groupsCollectionReference)

        const tempGroups = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        setDisplayedGroup(tempGroups.shift());
        setGroups(tempGroups);
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
        const gref = doc(db, "groups", displayedGroup.id);

        if (isGold) {
            await updateDoc(gref, {
                goldmatches: arrayUnion(id)
            });
        } else {
            await updateDoc(gref, {
                regmatches: arrayUnion(id)
            });
        }
        checkMutualMatch(id, displayedGroup.id);
        if (isGold) {
            document.getElementById("isMatched").innerHTML = "MATCHED WITH GROUP USING GOLD";
        } else {
            document.getElementById("isMatched").innerHTML = "MATCHED WITH GROUP";
        }
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

    const nextGroup = () => {
        setDisplayedGroup(groups.shift());
    }

    const unmatchButton = async () => {
        const gref = doc(db, "groups", displayedGroup.id);
        await updateDoc(gref, {
            goldmatches: arrayRemove(id),
            regmatches: arrayRemove(id)
        }).then(() => {

        });
        document.getElementById("isMatched").innerHTML = "";
    }

    const logButton = () => {
        console.log("LOGGER! Size: ", groups.length);
        groups.map((m) => {
            console.log("LOG: ", m.groupName);
        });
    }


    return (
        <div>
            <Navbar/>
            <h2>testing</h2>

            <div id="matchcard">
                <h1 id="gname">{displayedGroup.groupName}</h1>
                <h2 id="ginterest">{displayedGroup.interest}</h2>
                <p id="gdescription">{displayedGroup.description}</p>
                <h2 id="gdate"></h2>
                <h2 id="isMatched"></h2>
            </div>
            <button onClick={nextGroup}>Next group</button>
            <button onClick={() => { matchWithGoup(true) }}>Match with GOLD</button>
            <button onClick={() => { matchWithGoup(false) }}>Match with Regular</button>
            <button onClick={() => { unmatchButton() }}>Unmatch (gold and regular)</button>
            <button onClick={() => { logButton() }}>Logger</button>
        </div>
    )
}