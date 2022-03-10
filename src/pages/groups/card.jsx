import React from "react";
import MUICard from "@mui/material/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { db } from "../../firestore";
import { collection, arrayRemove, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { getBottomNavigationUtilityClass } from "@mui/material";
import { CardList } from "./cardlist";
import Button from '@material-ui/core/Button';
import "./card.css";
import { makeStyles } from "@material-ui/core";
import PopUp from "../../components/popup";






export const Card = (props) => {

    const [reloader, setReloader] = useState([]);
    const navi = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [severity, setSeverity] = useState("");


    //Popup
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const enterGroup = (id) => {
        navi("/group/" + id);
    }

    /**
       * A user can send a request to join the group. The admin of the group can then accept requests. 
       * 
       * The "key" part is not yet figured out. It works, but it is a little weird. 
       * 
       * @returns void to end the function
       */
    const requestToJoin = async () => {
        var key = false;
        if (!key) {
            if (auth.currentUser.email == props.group.owner) {
                setFeedbackMessage("You are the owner of this group!");
                setSeverity("error");
                console.log("Owner of group");
                setOpen(true);
                return;
            }
            props.group.members.map((m) => {
                if (m == auth.currentUser.email) {
                    setFeedbackMessage("Already in group");
                    setSeverity("error")
                    console.log("Already in group");
                    setOpen(true);
                    return;
                }
            });
            key = true;
            setFeedbackMessage("Group request sent!");
            setSeverity("success")
            setOpen(true);
        }

        if (key) {
            const docRef = doc(db, "groups", props.group.id);
            await updateDoc(docRef, {
                requests: arrayUnion(auth.currentUser.email)
            });
        }
        
    }

    const useStyles = makeStyles({
        gridContainer: {
            paddingTop: '10px',
            paddingLeft: '100px',
        }
    })

    const classes = useStyles();



    return (
        <div>
            <MUICard variant="outlined" className="groupElement">
                <div>
                    <h1 className="textOnCard">{props.group.groupName}</h1>
                    <p className="textOnCard">Interest: {props.group.interest}</p>
                    <p className="textOnCard">Location: {props.group.location}</p>
                    <p className="textOnCard"> Owner: {props.group.owner} </p>
                </div>
                <div className="card-buttons">
                    <Button id="visitGroupButton" onClick={() => { enterGroup(props.group.id) }} variant="outlined">Visit group</Button>
                    <Button id="requestButton" onClick={() => { requestToJoin() }} variant="outlined">Request to join group</Button>
                    <PopUp open={open} severity={severity} feedbackMessage={feedbackMessage} handleClose={handleClose}>
                    </PopUp>
                </div>
            </MUICard>
        </div>
    )
}