import React from "react";
import { useState, useEffect } from "react";

import "./user.css";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db } from "../../firebase-config";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, arrayRemove, arrayUnion, where } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Navbar from "../../components/navbar";


// const nameRef = doc(db, "profile", id);


export default function User() {

    const profileCollectionReference = collection(db, "profile");
<<<<<<< HEAD
    //  const [profiles, setProfiles] = useState([]); Not in use
    const [user, setUser] = useState({});
    const [name, setName] = useState(" ");
=======
    const [profiles, setProfiles] = useState([]);
    const [user, setUser] = useState({});
    const [name, setName] = useState( "" );
>>>>>>> 55983044d553eda63ff14624098b6bac8e6f8cc2

    const nav = useNavigate();


    /**
     * Hook for loading the list of profiles from firebase.
     * Currently not in use?
     */

    /*
    useEffect(() => {
        const getProfiles = async () => {
          const data = await getDocs(profileCollectionReference);
          setProfiles(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
        getProfiles();
      }, []); 
      */

    /*
    const getProfiles = async () => {
        const data = await getDocs(profileCollectionReference);
        setProfiles(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        data.forEach((t) => {
            console.log(t.id);
            console.log(t.data());
            console.log(t.data().testAge);
        })
      }; */
    

    const getName = async (currentUser) => {
        const data = await getDocs(profileCollectionReference);
        data.forEach((t) => {
            if (t.id == currentUser.email) {
                setName(t.data().testName + " " + t.data().testLastname)
                console.log();
            }
        })
    }

    useEffect(() => {
 
        /* const getName = async () => {
            const queryName = query(profileCollectionReference, where("testEmail", "==", auth.currentUser.email));

            const snapshotName = await getDocs(queryName);
            console.log(queryName)
            setName(snapshotName.metadata.testName);
            
        }
        getName(); */


        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (!currentUser) {
                console.log(auth.currentUser);
                nav("/");
            }

            getName(currentUser);
        });
    }, []);


    /**
     * Function for logging out from the firebase-authentication.
     * Gets called when the LOG OUT button in clicked.
     */
    const logout = async () => {
        console.log("User signed out");
        await signOut(auth);
        nav("/");

    };

    /**
     * Function that is called from the DELETE USER button. 
     * deletes the profile from firebase, as well as the authentication.
     * 
     * TODO: Remove the deleted user from all groups, and determine what to do with groups that this user owns. 
     */
    const deleteUser = async () => {
        deleteOwnedGroups();
        removeUserFromAllGroups(user.email);
        await deleteDoc(doc(db, "profile", user.email));
        auth.currentUser.delete().then(() => {
            logout(); //This is probably not needed
        }).catch((error) => {
            console.log("Error in deletion");
        });
    }



    /**
     * Reuseable block of code that takes in an email, and removes this email from all groups that the corresponding
     * user is a member of (NB: Does not remove email from groups that it owns/has created)
     * 
     * @param {*} userEmail could be derived from auth.currentUser.email
     */
    const removeUserFromAllGroups = async (userEmail) => {
        const groupRef = collection(db, "groups");
        const queryForGroups = query(groupRef, where("members", "array-contains", userEmail));
        const querySnapshot = await getDocs(queryForGroups);

        querySnapshot.docs.map((g) => {
            updateDoc(g.ref, {
                members: arrayRemove(userEmail)
            }).then(() => {
                console.log("Successfully removed user from group ", g.id);
            }).catch((error) => {
                console.error(error);
            })
        })
    }

    const deleteOwnedGroups = async () => {
        const queryForGroups = query(collection(db, "groups"), where("owner", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(queryForGroups);

        querySnapshot.docs.map((g) => {
            deleteDoc(doc(db, "groups", g.id)).then(() => {
                console.log("Deleted group");
            });
        })
    }


    /**
     * Temporary function to quickly create a group
     * 
     * @returns void
     */
    const createGroup = async () => {
        nav("/creategroup");
    }

    const goToGroups = () => {
        nav("/groups");
    }

    const goToMyGroups = () => {
        nav("/myGroups");
    }


    return (
        <><Navbar className="navbar"></Navbar>
<<<<<<< HEAD
            <div className="user">
                <div className="top-part">
                    <h1 className="username">{user?.email}</h1>
                </div>

                <AccountCircleIcon
                    className="avatar"
                    sx={{ width: 86, height: 86 }}
                ></AccountCircleIcon>

                <div>
                    <Button variant="contained" id="btnLogOut" onClick={goToGroups}>
                        All groups
                    </Button>
                    <Button variant="contained" id="btnLogOut" onClick={goToMyGroups}>
                        My groups
                    </Button>
                    <Button variant="contained" id="btnLogOut" onClick={() => removeUserFromAllGroups(auth.currentUser.email)}>
                        Remove User from joined groups
                    </Button>
                    <Button variant="contained" id="btnLogOut" onClick={createGroup}>
                        Create group
                    </Button>
=======
        <div className="user">
            <div className="top-part">
                <h1 className="username">{name}</h1>
            </div>

            <AccountCircleIcon
                className="avatar"
                sx={{ width: 86, height: 86 }}
            ></AccountCircleIcon>

            <div className="interests">
                <h3>My Interests:</h3>
                <div className="myInterests">
                    <p>Interest 1</p>
                    <p>Interest 2</p>
                    <p>Interest 3</p>
                    <p>Interest 4</p>
>>>>>>> 55983044d553eda63ff14624098b6bac8e6f8cc2
                </div>
                <div className="interests">
                    <h3>My Interests:</h3>
                    <div className="myInterests">
                        <p>Interest 1</p>
                        <p>Interest 2</p>
                        <p>Interest 3</p>
                        <p>Interest 4</p>
                    </div>
                    <h3>Choose New Interests:</h3>
                    <div className="newInterest">
                        <div>
                            <p>new Interest:</p>
                            <TextField id="filled-basic" label="Filled" variant="filled" />
                        </div>
                        <div>
                            <p>Change with:</p>
                            <TextField id="filled-basic" label="Filled" variant="filled" />
                        </div>
                    </div>

                    <Button variant="contained" id="btnSend">
                        CHANGE
                    </Button>
                </div>

                <Button variant="contained" id="btnLogOut" onClick={logout}>
                    Log out
                </Button>
                <Button variant="contained" id="btnLogOut" onClick={deleteUser}>
                    Delete User
                </Button>

            </div></>
    );
};