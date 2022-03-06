import { useState, useEffect } from "react";
import React from "react";
import "./user.css";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db, storage } from "../../firebase-config";
import { signOut, onAuthStateChanged, deleteUser } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, arrayRemove, arrayUnion, where } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Navbar from "../../components/navbar";


// const nameRef = doc(db, "profile", id);


export default function User() {

    const profileCollectionReference = collection(db, "profile");
    const [profiles, setProfiles] = useState([]);
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");
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




    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    function handleUpload2(e) {
        e.preventDefault();
        const ref = storage.ref(`${file.name}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
                .getDownloadURL()
                .then((url) => {
                    setFile(null);
                    setURL(url);
                });
        });
    }




    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };



    const handleUpload = () => {
        // console.log(this.state.image);
        let file = this.state.image;
        var storage = storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child(file.name).put(file);

        uploadTask.on(storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
                this.setState({ progress })
            }, (error) => {
                throw error
            }, () => {
                // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    this.setState({
                        downloadURL: url
                    })
                })
                document.getElementById("file").value = null

            }
        )
    }




    return (
        <><Navbar className="navbar"></Navbar>
            <div className="user">
                <div className="top-part">
                    <h1 className="username">{name}</h1>
                </div>

                <div>
                    <form onSubmit={handleUpload2}>
                        <input type="file" onChange={handleChange} />
                        <button disabled={!file}>upload kkkkkto firebase</button>
                    </form>
                    <img src={url} alt="" />
                </div>






                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <input
                        type="file"
                        id = "file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={imageUploader}
                        style={{
                            display: "none"
                        }}
                    />
                    <div
                        style={{
                            height: "150px",
                            width: "150px",
                            border: "1px dashed black"
                        }}
                        onClick={() => imageUploader.current.click()}
                    >
                        <img
                            ref={uploadedImage}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative"
                            }}
                        />
                    </div>
                    Click to upload Image
                </div>
                <button onClick={handleUpload}>bgf </button>



                {/*                 <AccountCircleIcon
                    className="avatar"
                    sx={{ width: 86, height: 86 }}
                ></AccountCircleIcon>
 */}
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