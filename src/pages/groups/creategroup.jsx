import React from "react";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../../firebase-config";
import { db } from "../../firestore";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, arrayRemove, arrayUnion, where } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import "./creategroup.css";
import PopUp from "../../components/popup";
import Navbar from "../../components/navbar";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function CreateGroup() {
    
    const [user, setUser] = useState({});
    const navi = useNavigate();
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

    const [errorGroupName, setErrorGroupName] = useState(false);
    const [errorInterest, setErrorInterest] = useState(false);
    const [errorLocation, setErrorLocation] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const getUser = async () => {
            setUser(auth.currentUser);
        };
        getUser();
    });



    /**
     * Needs severe error handling
     * 
     * @returns void
     */
    const createGroupButton = async () => {

        if (!user) {
            console.log("No user is currently signed in. Cannot create a group.");
            return;
        }
        const groupName = document.getElementById("groupNameInput").value;
        const interest = document.getElementById("groupInterest").value;
        const location = document.getElementById("locationInput").value;
        //Algo for comma-separated memebers list
        const membersArray = document.getElementById("enterFriendInput").value.split(", ");

        if (!checkInputsForValidation()) {
     
            setOpen(true);
            return;
        }

        await addDoc(collection(db, "groups"), {
            owner: auth.currentUser.email,
            groupName: groupName,
            interest: interest,
            location: location,
            datetime: dateTime,
            description: document.getElementById("des").value,
            members: membersArray,
            requests: [],
            regmatches: [],
            goldmatches: [],
            mutualmatches: []
        }).then((t) => {
            console.log("Created group!");
        }).catch((error) => {
            console.error(error);
        });
        goToGroup();

    }

    const goBackButton = () => {
        navi("/user");
    }

    const goToGroup = () => {
        navi("/mygroups");
    }

    const checkInputsForValidation = () => {
        if (checkGroupName() && checkInterest() && checkLocation()) {
            return true;
        } else {
            return false;
        }
    }

  
    const checkGroupName = () => {
        if (document.getElementById("groupNameInput").value === "") {
            setErrorGroupName(true);
            return false;
        } 
        setErrorGroupName(false);
        return true;
    }

    const checkInterest = () => {
        if (document.getElementById("groupInterest").value === "") {
            setErrorInterest(true);
            return false;
        }
        setErrorInterest(false);
        return true;
    }

    const checkLocation = () => {
        if (document.getElementById("locationInput").value === "") {
            setErrorLocation(true);
            return false;
        }
        setErrorLocation(false);
        return true;
    }


    return (
        <div>
            <Button onClick={goBackButton} variant="outlined" className="backBtn">Go Back</Button>

            <div className="groupForm">
                <div><h1>CREATE GROUP</h1></div>
                <div className="allInputs">

                    <TextField error={errorGroupName} placeholder="enter group name*" variant="standard" id="groupNameInput" />
                    <TextField error={errorInterest} placeholder="enter interest*" variant="standard" id="groupInterest" />
                    <TextField placeholder="enter email of friend" variant="standard" id="enterFriendInput" />
                    <TextField error={errorLocation} placeholder="enter a location*" variant="standard" id="locationInput" />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Enter date and time"
                            value={dateTime}
                            onChange={(newValue) => {
                                setDateTime(newValue);
                                console.log(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    <TextareaAutosize id="des" minRows="5" placeholder="Enter a description of your group"/>
                    <br/>
                    <br/>
                    <Button onClick={createGroupButton} variant="outlined" style={{backgroundColor:'#c6d7dd', color:'black'}}>Create group</Button>
                    <PopUp open={open} severity = {"error"} feedbackMessage = {"Missing fields"} handleClose = {handleClose}>
                    </PopUp>
                </div>
            </div>
        </div>

    )
}
