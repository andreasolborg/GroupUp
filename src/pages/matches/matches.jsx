import React from "react";
import { FormControl, makeStyles, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import { db } from "../../firestore";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, documentId, getDoc, doc } from 'firebase/firestore';
import CardList from "../groups/cardlist";
import "./matches.css";
import { Box, InputLabel, MenuItem, NativeSelect, Typography } from "@mui/material";

export default function Matches() {

  const [matches, setMatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");

  const groupsCollectionReference = collection(db, "groups");

  const handleDropdownChange = (event) => {
    setGroup(event.target.value);

    updateMatches(event.target.value);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      updateGroups();
    });
  }, []);


  const updateMatches = async (groupId) => {
    if (groupId == null) {
      return;
    }

    try {
      const snap = await getDoc(doc(db, "groups", groupId));

      const tempArr = snap.data().mutualmatches;
  
      const querySnap = await getDocs(query(collection(db, "groups"), where(documentId(), "in", tempArr)));
      setMatches(querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  
    } catch (error) {
      setMatches([]);
    }
  }


  const updateGroups = async () => {
    const ownedGroups = query(groupsCollectionReference, where("owner", "==", auth.currentUser.email));
    const ownedSnapshot = await getDocs(ownedGroups);

    const joinedGroups = query(groupsCollectionReference, where("members", "array-contains", auth.currentUser.email));
    const joinedSnapshot = await getDocs(joinedGroups);

    const tempGroups = [];

    ownedSnapshot.forEach((doc) => {
      tempGroups.push({ ...doc.data(), id: doc.id });
    })

    joinedSnapshot.forEach((doc) => {
      tempGroups.push({ ...doc.data(), id: doc.id });
    })

    setGroups(tempGroups);
  }


  return (
    <>
      <div className="matches">
        <div className="t">
          <h1 className="title">Your Matches</h1>
        </div>

        <Box sx={{minWidth: 120}} >
          <FormControl xs={6}>
            <InputLabel variant="standard" htmlFor="dropdown">
              Group
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: 'age',
                id: 'dropdown',
              }}
              value={group}
              onChange={handleDropdownChange}
            >
              <option id= {"Dropdown: none"}value = {""}>None</option>
              {groups.map((doc) => (
                <option id={`Dropdown: ${doc.groupName}`} value={doc.id}>{doc.groupName}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>

        <div className="container">
          {
            matches.length < 1 && <Typography>No matches found.</Typography>
          }
          <CardList groups={matches} />
        </div>
      </div>
    </>
  );
}