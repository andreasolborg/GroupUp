import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { db } from "../../firestore";
import { getBottomNavigationUtilityClass } from "@mui/material";
import Card from "./card";
import { CardList } from "./cardlist";
import Button from '@material-ui/core/Button';

import { collection, arrayRemove, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion, documentId } from 'firebase/firestore'
import { ClassNames } from "@emotion/react";
import "./group.css";
import Navbar from "../../components/navbar";
import DateTimePicker from 'react-datetime-picker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import GroupOwnerPanel from "./groupOwnerPanel";
import { Grid } from "@mui/material";
import { DomainVerificationTwoTone } from "@mui/icons-material";

//This page holds information on a particular group. 

/**
 * 
 *KNOWN PROBLEMS: Every time you have a group page open and compiles the code (save), the list of members and 
 *list of requests multiply. It works as intended if no re-compiling occurs.
 */


export default function Group() {


    /**
    * id is used for determining wich group that has been entered. This group-id also makes the URL for that group-page.
    */
    const { id } = useParams();
    const navi = useNavigate();


    const [owner, setOwner] = useState("");
    const [interest, setInterest] = useState("");
    const [groupName, setGroupName] = useState("");
    const [location, setLocation] = useState("");
    const [members, setMembers] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [requests, setRequests] = useState([]);
    const [dateTime, setDateTime] = useState(new Date());
    const [description, setDescription] = useState("");
    const [golds, setGolds] = useState([]);

    const groupRef = doc(db, "groups", id);


    /**
     * Sets the useState of members, broken af
     */
    useEffect(() => {
        const getMembers = async () => {
            const groupDocsnap = await getDoc(groupRef);

            var bool = false;
            if (groupDocsnap.data().owner == auth.currentUser.email) {
                bool = true;
            }
            groupDocsnap.data().members.map((m) => {
                setMembers((members) => [...members, m]);
                if (m == auth.currentUser.email){
                    bool = true;
                }
            });
            if (bool){
                document.getElementById("leaveButton").style = "visibility: visible";
            }
        }
        getMembers();
    }, []);

    useEffect(() => {
        const getRequests = async () => {
            const groupDocSnap = await getDoc(groupRef);
            groupDocSnap.data().requests.map((req) => {
                setRequests((requests) => [...requests, req]);
            });
        }
        getRequests();
    }, []);


    useEffect(() => {
        const getAdmin = async () => {
            const groupDocSnap = await getDoc(groupRef);
            if (groupDocSnap.data().owner == auth.currentUser.email) {
                setAdmin(true);
                document.getElementById("showAdmin").style = "display:inline-block";
            }
        }
        getAdmin();
    }, []);

    var key = true; //Key is used to lock the useEffect below when the group dont exist

    /**
     * This useEffect is locked by a key. This is in order to prevent errors (reading undefined values from firebase) 
     * after an owner (or member) has left the group.
     */
    useEffect(() => {
        const getOwner = async () => {
            if (key === false) {
                return;
            }
            const groupDocSnap = await getDoc(groupRef);

            setOwner(groupDocSnap.data().owner);
            setLocation(groupDocSnap.data().location);
            setInterest(groupDocSnap.data().interest);
            setGroupName(groupDocSnap.data().groupName);
            setDateTime(new Date(groupDocSnap.data().datetime.seconds * 1000));
            setDescription(groupDocSnap.data().description);

            const queryOnGolds = query(collection(db, "groups"), where(documentId(), "in", groupDocSnap.data().goldmatches));
            const qogSnapshot = await getDocs(queryOnGolds);
            setGolds(qogSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getOwner();
    }, []);


    /**
     * navigates back to the user-page with useNavigate()
     */
    const goBackButton = () => {
        navi("/user");
    }


    /**
     * Function that allows a user to leave a group. 
     * It checks for: Ownership (delete group), membership (leave group)
     * if not a member, nothing happens
     * 
     * @returns void to end the function
     */
    const leaveGroup = async () => {
        const groupSnapshot = await getDoc(groupRef);
        if (groupSnapshot.data().owner == auth.currentUser.email) {
            await deleteDoc(doc(db, "groups", id));
            navi("/user");
            key = false;
            return;
        }

        var isMember = false;
        groupSnapshot.data().members.map((m) => {
            if (m === auth.currentUser.email) {
                isMember = true;
            }
        });

        if (isMember) {
            await updateDoc(groupRef, {
                members: arrayRemove(auth.currentUser.email)
            });
            console.log("Left group");
            navi("/user");
        } else {
            console.log("You are not a member of this group, therefore you cannot leave it");
        }
    }

    /**
     * Function that removes a user from the group. Can only be called by group owner (button click).
     */
    const removeUserButton = async () => {
        await updateDoc(groupRef, {
            members: arrayRemove(document.getElementById("removeUserInput").value)
        });
        document.getElementById("removeUserInput").value = "";
        window.location.reload(false);
    }

    /**
     * Group-owner function: Accept users who have sent join-requests.
     * 
     * @param {*} user user = email, email serves as key for a user
     */
    const acceptRequestButton = async (user) => {
        await updateDoc(groupRef, {
            members: arrayUnion(user),
            requests: arrayRemove(user)
        });
        window.location.reload(false);
    }

    /**
     * Update details like GroupName, GroupInterest, GroupLocation
     * Directly connected to firebase
     */
    const updateGroupDetails = async () => {
        //Gets values from the inputs.
        var gname = document.getElementById("groupNameInput").value;
        var ginterest = document.getElementById("interestInput").value;
        var glocation = document.getElementById("locationInput").value;

        if (gname === "" && ginterest === "" && glocation === "") {
            console.log("Nothing to update");
            return;
        }

        if (gname !== "") {
            await updateDoc(groupRef, {
                groupName: gname
            });
        }
        if (ginterest !== "") {
            await updateDoc(groupRef, {
                interest: ginterest
            });
        }
        if (glocation !== "") {
            await updateDoc(groupRef, {
                location: glocation
            });
        }
        window.location.reload(false);
    }

    const setNewDate = async () => {
        await updateDoc(groupRef, {
            datetime: dateTime
        });
        window.location.reload(false);
    }


    /**
     * Function that adds users to a group, both in firebase and in the webapp.
     * 
     * Gets called when a group-owner adds users by email. 
     */
    const addUserButton = async () => {
        //ArrayOfUsers is an array of emails. The emails serves as keys for the users.
        var arrayOfUsers = document.getElementById("addUserInput").value.split(", ");

        await updateDoc(groupRef, {
            members: arrayUnion(...arrayOfUsers)
        }).then(() => {
            console.log("Added users to members!");
        });
        window.location.reload(false);
    }

    const sendNewDescription = async () => {
        const areaString = document.getElementById("des").value;
        if (areaString === "") {
            console.log("Empty area, returning");
            return;
        }
        setDescription(areaString);
        await updateDoc(groupRef, {
            description: areaString
        })
    }

    const hideAdminButton = () => {
        document.getElementById("admin").style = "display: none";
        document.getElementById("showAdmin").style = "display: inline-block";

    }

    const showAdminButton = () => {
        document.getElementById("admin").style = "display: inline-block";
        document.getElementById("showAdmin").style = "display: none";
    }

    const goToMatching = () => {
        navi("/matchpage/" + id);
    }

    const contactButton = () => {
        window.confirm("E-Mail of owner: " + owner);
    }

    // <Button onClick={getAdminElements} variant="contained">Admin</Button>

    return (
        <div className="outerDiv">
            <Navbar />
            <div className="groupPage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="groupBox"  >
                    <div className="header">
                        <Grid container>
                            <Grid xs={9}>
                                <h1 style={{ marginTop: 60 }}>{groupName}</h1>
                            </Grid>
                            <Grid xs={3} style={{ alignItems: "center", justifyContent: "center" }}>
                                <Button id='leaveButton' style={{ marginTop: 50 }} className="obsButton" variant="contained" onClick={() => leaveGroup()}>Leave group</Button>
                                <Button id='contactButton' style={{ marginTop: 50 }} className="obsButton" variant="contained" onClick={() => contactButton()}>Contact</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid container>
                        <Grid xs={6}>
                            <div className="information" >
                                <p style={{ fontSize: 20 }} >
                                    <b style={{ textDecoration: 'underline' }}>Interest:</b> {interest}
                                </p>
                                <p style={{ fontSize: 20 }}><b style={{ textDecoration: 'underline' }}>Location:</b> {location}</p>
                                <p style={{ fontSize: 20 }}><b style={{ textDecoration: 'underline' }}>Meeting time: </b> {dateTime.toUTCString()}</p>
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className="memberBox">
                                <h2 style={{ fontFamily: 'Archivo', textDecoration: 'underline' }}><b>Members:</b></h2>
                                <div>
                                    {members.map((m) => (
                                        <div className="membersList">
                                            <p>{m}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid>
                        <Grid>
                            <div style={{ alignItems: 'center', justifyContent: 'center', fontFamily: 'Archivo', margin: 100 }}>
                                <h2 style={{ fontFamily: 'Archivo', textDecoration: 'underline' }}>Decription</h2>
                                <p>{description}</p>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div id="showAdmin">
                <Button id='btnID' variant="contained" onClick={showAdminButton}>Show Admin Priviliges</Button>
            </div>
            <GroupOwnerPanel
                ownGroupId={id}
                hideAdminButton={hideAdminButton}
                enterMatchingButton={goToMatching}
                updateGroupDetails={updateGroupDetails}
                removeUserButton={removeUserButton}
                setNewDate={setNewDate}
                sendNewDescription={sendNewDescription}
                goldmatches={golds}
                requests={requests}
                leaveGroup={leaveGroup}
                addUserButton={addUserButton}
                setDateTime={setDateTime}
                dateTime={dateTime}
                acceptRequestButton={acceptRequestButton}
            />

        </div >
    )
}
