import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import Navbar from "../../components/navbar";
import { db } from "../../firestore";
import Button from '@material-ui/core/Button';
import { query, where, collection, arrayRemove, getDocs, updateDoc, doc, addDoc, setDoc, getDoc, arrayUnion, documentId } from 'firebase/firestore'
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
        const qq = query(groupsCollectionReference, where(documentId(), "!=", id));
        const querySnapshot = await getDocs(qq);

        const tempGroups = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        updateDisplayedGroup(tempGroups.shift());
        setGroups(tempGroups);
    }


    /**
     * Current thought: Keep 2 arrays in firestore: 1) regular matches 2) gold matches. 
     * The two arrays should be maintained more or less the same, but with different priority protocol.
     * 
     * 
     * @param {boolean} isGoldMatch 
     */
    const matchWithGroup = async (isGold) => {
        //Get id of group on head
        const gref = doc(db, "groups", displayedGroup.id);

        if (isGold) {
            await updateDoc(gref, {
                goldmatches: arrayUnion(id)
            });
            console.log("gold match");
            setMatches(false, true);
        } else {
            await updateDoc(gref, {
                regmatches: arrayUnion(id)
            });
            console.log("reg match");
            setMatches(true, false);
        }
        checkMutualMatch(id, displayedGroup.id);
    }


    const updateDisplayedGroup = async (group) => {
        let dict = new Object();

        dict["id"] = group.id;
        dict["groupName"] = group.groupName;
        dict["interest"] = group.interest;
        dict["description"] = group.description;
        dict["time"] = getTimestampString(group.datetime);
        dict["regMatch"] = await isMatched(group.id, false);
        dict["goldMatch"] = await isMatched(group.id, true);

        setDisplayedGroup(dict);
    }


    const isMatched = async (otherGroupId, isGold) => {
        try {
            const otherGroupRef = doc(db, "groups", otherGroupId);
            const otherGroupSnap = await getDoc(otherGroupRef);

            if (isGold) {
                return otherGroupSnap.data().goldmatches.includes(id);
            }
            return otherGroupSnap.data().regmatches.includes(id);

        } catch (error) {
            return false;
        }
    }

    const checkMutualMatch = async (ownGroupId, otherGroupId) => {
        const myGroupRef = doc(db, "groups", ownGroupId);
        const otherGroupRef = doc(db, "groups", otherGroupId);

        const myGroupSnap = await getDoc(myGroupRef);
        const otherGroupSnap = await getDoc(otherGroupRef);

        if ((myGroupSnap.data().goldmatches.includes(otherGroupId) || myGroupSnap.data().regmatches.includes(otherGroupId)) &&
            (otherGroupSnap.data().regmatches.includes(ownGroupId) || otherGroupSnap.data().goldmatches.includes(ownGroupId))) {
            console.log("MUTUAL MATCH");
            await updateDoc(doc(db, "groups", ownGroupId), {
                mutualmatches: arrayUnion(otherGroupId),
                regmatches: arrayRemove(otherGroupId),
                goldmatches: arrayRemove(otherGroupId)
            });
            await updateDoc(doc(db, "groups", otherGroupId), {
                mutualmatches: arrayUnion(ownGroupId),
                regmatches: arrayRemove(ownGroupId),
                goldmatches: arrayRemove(ownGroupId)
            });
        } else {
            console.log("Not a mutual match");
        }
    }

    const nextGroup = () => {
        if (groups.length > 0) {
            updateDisplayedGroup(groups.shift());
            return;
        }
        updateGroups();
    }

    const unmatchButton = async () => {
        const gref = doc(db, "groups", displayedGroup.id);
        await updateDoc(gref, {
            goldmatches: arrayRemove(id),
            regmatches: arrayRemove(id)
        });
        setMatches(false, false);
    }


    const setMatches = (reg, gold) => {
        const tempGroup = { ...displayedGroup };

        if (typeof (reg) !== "boolean" || typeof (gold) !== "boolean") {
            console.log("match must be a boolean");
            return;
        }
        console.log("reg: ", reg);

        tempGroup["regMatch"] = reg;
        tempGroup["goldMatch"] = gold;

        setDisplayedGroup(tempGroup);
    }


    const getTimestampString = (timestamp) => {
        let date = new Date(timestamp.seconds * 1000);

        return date.toUTCString();
    }


    return (
        <div>
            <Navbar />
            <h2 id="title">MATCH WITH GROUPS</h2>

            <div id="matchcard">
                <h1 id="gname">{displayedGroup.groupName}</h1>
                <h2 id="ginterest">{displayedGroup.interest}</h2>
                <p id="gdescription">{displayedGroup.description}</p>
                <h2 id="gdate">{displayedGroup.time}</h2>
                <h2 id="regMatch">{displayedGroup.regMatch ? "Already matched" : ""}</h2>
                <h2 id="goldMatch"> {displayedGroup.goldMatch ? "Already matched with gold" : ""} </h2>
            </div>
            <div id="matchcard">
                <Button id="muibutton" variant="outlined" onClick={nextGroup}>Next group</Button>
                <Button id="muibutton" variant="outlined" onClick={() => { matchWithGroup(true) }}>Match with GOLD</Button>
                <Button id="muibutton" variant="outlined" onClick={() => { matchWithGroup(false) }}>Match with Regular</Button>
                <Button id="muibutton" variant="outlined" onClick={() => { unmatchButton() }}>Unmatch (gold and regular)</Button>
            </div>
        </div>
    )
}