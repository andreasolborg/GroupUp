import React from "react";
import MUICard from "@mui/material/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { collection, arrayRemove, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { getBottomNavigationUtilityClass } from "@mui/material";
import { CardList } from "./cardlist";
import Button from '@material-ui/core/Button';
import "./card.css";




export const Card = (props) => {

    const [reloader, setReloader] = useState([]);
    const navi = useNavigate();

    const enterGroup = (id) => {
       navi("/group/"+ id);
    }

    const requestToJoin = async () => {
        const key = false;
        if (!key) {
            if (auth.currentUser.email == props.group.owner) {
                console.log("Owner of group");
                return;
            }
            props.group.members.map((m) => {
                if (m == auth.currentUser.email) {
                    console.log("Already in group");
                    return;
                }
            });
            key = true;
        } 

        if (key) {
            const docRef = doc(db, "groups", props.group.id);
            await updateDoc(docRef, {
                requests: arrayUnion(auth.currentUser.email)
            });
        }
    }

    const leaveGroup = async () => {
        if (props.group.owner == auth.currentUser.email) {
            await deleteDoc(doc(db, "groups", props.group.id));
            window.location.reload(false);
            return;
        }
        const docRef = doc(db, "groups", props.group.id);
        await updateDoc(docRef, {
            members: arrayRemove(auth.currentUser.email)
        });
    }


    return (
    <MUICard className="groupElement" variant="outlined">
        <h1>{props.group.groupName}</h1>
        <h3>Interest: {props.group.interest}</h3>
        <p> Owner of group: {props.group.owner} </p>
        <p>Group members</p>
        <div> {props.group.members?.map((member) => (
            <p>{member}</p>
        ))}</div>
        <div className="groupBtn">
        <Button onClick={() => {enterGroup(props.group.id)}} variant="outlined">Enter group</Button>
        <Button onClick={() => {requestToJoin()}} variant="outlined">Request to join group</Button>
        <Button onClick={() => {leaveGroup()}} variant="outlined">Leave Group</Button>
        </div>
    </MUICard>
    )
}