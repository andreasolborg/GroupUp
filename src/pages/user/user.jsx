import { useState, useEffect } from "react";
import React from "react";
import "./user.css";
import Button from "@mui/material/Button";
import { auth, storage } from "../../firebase-config";
import { db } from "../../firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, updateDoc, doc, deleteDoc, arrayRemove, where, query } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Avatar from '@mui/material/Avatar'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function User() {

    const profileCollectionReference = collection(db, "profile");
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const nav = useNavigate();

    const [interests, setInterests] = useState([]);
    const [interest, setInterest] = useState("");


    const getUserInfo = async (currentUser) => {
        const data = await getDocs(profileCollectionReference);
        data.forEach((t) => {
            if (t.id.toLowerCase() == currentUser.email.toLowerCase()) {
                setName(t.data().firstname + " " + t.data().lastname)
                setInterests(t.data().interest);
            }
        })
    }

    const updateInterest = (e) => {
        setInterest(e.target.value);
    }

    function addInterest() {
        if (!interests.includes(interest) && interest.trim().length != 0) {
            const newInterests = [...interests, interest]
            setInterests(newInterests);
            updateFirebaseInterests(newInterests);
        }
    }


    function removeInterest() {
        let newInterests = [...interests];
        const index = newInterests.indexOf(interest);
        if (index < 0) {
            return;
        }
        newInterests.splice(index, 1);
        setInterests(newInterests);
        updateFirebaseInterests(newInterests);
    }

    const updateFirebaseInterests = async (interests) => {
        const userRef = doc(db, "profile", user.email);

        await updateDoc(userRef, {
            interest: interests
        });
    }


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            getUserInfo(currentUser);
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


    //IMAGE START HERE
    const [imageFlag, setImageFlag] = useState(0);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
        const getStandardImage = () => {
            console.log("standardImageLoader invoked");
            const pathRef = ref(storage, "/profile/groupPic.jpeg");
            getDownloadURL(pathRef).then((url) => {
                setUrl(url);
                setImageFlag((c) => (c++));
            });
        }
        getStandardImage();
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            regularImageLoader();
        });
    }, [imageFlag]);


    const regularImageLoader = () => {
        console.log("regularImageLoader invoked");
        const pathReference = ref(storage, "/profile/" + auth.currentUser.email);
        getDownloadURL(pathReference).then((url) => {
            //insert url into img tag in html
            setUrl(url);
        }).catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    break;
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        });
    }

    //////
    const uploadProfileImage = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.click();
        input.onchange = e => {
            if (e.target.files[0]) {
                setImage(e.target.files[0]);
                const metadata = {
                    contentType: 'image/jpeg',
                };
                const storageRef = ref(storage, "/profile/" + auth.currentUser.email);
                uploadBytes(storageRef, e.target.files[0], metadata);
            }
        }

    }

    //IMAGE ENDS HERE


    return (
        <>
            <div className="user">

                <h1 className="username"> {name} </h1>
                <div id="av">
                    <Avatar id="ava" onClick={uploadProfileImage} src={url} sx={{ width: 150, height: 150 }} />
                </div>


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
                </div>

                <div className="interests">
                    <h3>My Interests:</h3>
                    <div className="myInterests">
                        {interests.map((item) => (
                            <p key={`Interest: ${item}`}>{item}</p>
                        ))}
                    </div>
                    <h3>Change interest:</h3>
                    <div className="newInterest">
                        <div>
                            <TextField
                                d="filled-basic"
                                label="f.eks. fotball"
                                variant="filled"
                                value={interest}
                                onChange={updateInterest}
                            />
                        </div>
                    </div>

                    <Button variant="contained" id="btnSend" onClick={addInterest}>
                        Add
                    </Button>
                    <Button variant="contained" id="btnSend" onClick={removeInterest}>
                        Remove
                    </Button>
                </div>


                <Button variant="contained" id="btnLogOut" onClick={logout}>
                    Log out
                </Button>


                <Button variant="contained" id="btnLogOut" onClick={deleteUser}>
                    Delete User
                </Button>

            </div>

        </>
    );
};