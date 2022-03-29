import React from "react";
import { FormControl, makeStyles, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import { db } from "../../firestore";
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, documentId, getDoc, doc } from 'firebase/firestore';
import CardList from "../groups/cardlist";
import "./matches.css";
import { Box, InputLabel, MenuItem } from "@mui/material";

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

    const snap = await getDoc(doc(db, "groups", groupId));

    const tempArr = snap.data().mutualmatches;

    const querySnap = await getDocs(query(collection(db, "groups"), where(documentId(), "in", tempArr)));
    setMatches(querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
        <div className="container">
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel id="dropdownLabel">Group</InputLabel>
              <Select
                labelId="dropdownLabel"
                id="dropdown"
                value={group}
                label="Group"
                onChange={handleDropdownChange}
              >
                {groups.map((doc) => (
                  <MenuItem value={doc.id}>{doc.groupName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <CardList groups={matches} />
        </div>
      </div>
    </>
  );
}