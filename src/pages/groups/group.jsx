import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { db } from "../../firestore";
import { getBottomNavigationUtilityClass } from "@mui/material";
import Card from "./card";
import { CardList } from "./cardlist";
import Button from '@material-ui/core/Button';

import { collection, arrayRemove, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { ClassNames } from "@emotion/react";
import "./group.css";
import Navbar from "../../components/navbar";



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

    const groupRef = doc(db, "groups", id);


    /**
     * Sets the useState of members, broken af
     */
     useEffect(() => {
        const getMembers = async () => {
            const groupDocsnap = await getDoc(groupRef);

            groupDocsnap.data().members.map((m) => {
                setMembers((members) => [...members, m]);
            });
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
                document.getElementById("admin").style="display:block";
            } 
        }
        getAdmin();
    });

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
            if (groupDocSnap.data().owner === auth.currentUser.email) {
                setOwner("(You own this group)");
            } else {
                setOwner(groupDocSnap.data().owner);
            }
            setLocation(groupDocSnap.data().location);
            setInterest(groupDocSnap.data().interest);
            setGroupName(groupDocSnap.data().groupName);

        };
        getOwner();
    });


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

        if (gname!== ""){
            await updateDoc(groupRef, {
                groupName: gname
            });
        }
        if (ginterest !== ""){
            await updateDoc(groupRef, {
                interest: ginterest
            });
        }
        if (glocation !== ""){
            await updateDoc(groupRef, {
                location: glocation
            });
        }
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

// <Button onClick={getAdminElements} variant="contained">Admin</Button>

    return (
        <div>
            <Navbar></Navbar>
            <h1>{groupName}</h1>
            <h2>Owner: {owner}</h2>
            <h2>Interest: {interest}</h2>
            <h2>Location: {location}</h2>
            <h2>Members:</h2>
            <div>
                {members.map((m) => (
                    <div className="membersList">
                    <p>{m}</p>
                    </div>
                ))}
            </div>
            <Button className="obsButton" variant="contained" onClick={() => leaveGroup()}>Leave group</Button>

            <div id="admin">
                <div className="text">
                <h2>Gruppe leder</h2>
                <p>These functions are hidden for regular members</p>

                <div className="update-details">
                    <h3>Update Group Details</h3>
                    <input placeholder="Enter a group name" id="groupNameInput"/>
                    <input placeholder="Enter a new interest" id="interestInput"/>
                    <input placeholder="Enter a new location" id="locationInput"/>
                </div>
                <button onClick={updateGroupDetails}>Send</button>


                </div>
                <div className="remove-users">
                    <h3>Remove users</h3>
                    <input placeholder="Enter user-mail" id="removeUserInput"/>
                    <button onClick={removeUserButton}>Remove</button>
                </div>
                <div className="remove-users">
                    <h3>Add users</h3>
                    <input placeholder="Enter user-mail" id="addUserInput"/>
                    <button onClick={addUserButton}>Add</button>
                </div>

               
               <div className="text">
                    <h2>The request queue</h2>
                    {requests.map((r) => (
                        <div className="membersList">
                            <div className="text">
                            <h3>{r}</h3>
                            <button onClick={() => acceptRequestButton(r)}>Accept request</button>
                            </div>
                        </div>
                    ))}
               </div> 
               <Button className="obsButton" onClick={leaveGroup}>Delete Group</Button>
            </div>
        </div>
    )
}
