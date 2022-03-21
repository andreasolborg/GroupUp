import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, TextareaAutosize, TextField, Box, IconButton, InputAdornment } from '@mui/material';
import React from 'react';
//import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { isMatchWithOptions } from 'date-fns/fp';
import { db } from "../../firestore";
import { collection, arrayRemove, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion, documentId } from 'firebase/firestore'

export default function GroupOwnerPanel({
    ownGroupId,
    hideAdminButton,
    enterMatchingButton,
    updateGroupDetails,
    removeUserButton,
    setNewDate,
    sendNewDescription,
    goldmatches,
    requests,
    leaveGroup,
    addUserButton,
    setDateTime,
    dateTime,
    acceptRequestButton }) {



 

    const matchWith = async (group) => {

        //Update mutualmatches and remove pending
        await updateDoc(doc(db, "groups", ownGroupId), {
            mutualmatches: arrayUnion(group.id),
            goldmatches: arrayRemove(group.id),
            regmatches: arrayRemove(group.id)
        });
        await updateDoc(doc(db, "groups", group.id), {
            mutualmatches: arrayUnion(ownGroupId),
            goldmatches: arrayRemove(ownGroupId),
            regmatches: arrayRemove(ownGroupId)
        });
        window.location.reload(false);
     
    }

    const deleteRequest = async (group) => {
        await updateDoc(doc(db, "groups", ownGroupId), {
            goldmatches: arrayRemove(group.id)
        });
        window.location.reload(false);
    }

    return (
        
        <div id="admin" >
            
            <div className="text">
                <Button id="btnID" variant="contained" onClick={hideAdminButton} >Hide Admin Priviliges</Button>
                <Button id="btnID" variant="contained" className="obsButton" onClick={leaveGroup} >Delete Group</Button>
                <Button id="btnID" variant="contained" className="obsButton" onClick={enterMatchingButton} >Enter Matching</Button>
                <h2>Gruppeleder</h2>
                <p>These functions are hidden for regular members</p>
            </div>
            <Grid container>
                <Grid xs={3}>
                <div className="update-details">
                    <h3>Update Group Details</h3>
                    <TextField placeholder="Enter a group name" id="groupNameInput" variant='standard' />
                    <br/>
                    <TextField placeholder="Enter a new interest" id="interestInput" variant='standard' />
                    <br/>
                    <TextField placeholder="Enter a new location" id="locationInput" variant='standard'/>
                </div>
               
                <Button id="btnID" variant="contained" onClick={updateGroupDetails} >Send</Button>
            </Grid>

            <Grid xs={3}>
             <div className="remove-users">
                <h3>Remove users</h3>
                <TextField variant='standard' placeholder="Enter user-mail" id="removeUserInput"
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end" color="primary" onClick={removeUserButton}>
                                <RemoveIcon/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                />
            </div>
            </Grid>
            <Grid xs={3}>
            <div className="remove-users">
                <h3>Add users</h3>
                <TextField  variant='standard' placeholder="Enter user-mail" id="addUserInput"  
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end" color="primary" onClick={addUserButton}>
                                <AddIcon/>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                />
            </div>
            </Grid>
            <Grid xs={3}>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} style={{backgroundColor:"white"}}/>}
                        label="Enter date and time"
                        value={dateTime}
                        onChange={(newValue) => {
                            setDateTime(newValue);
                        }}
                        minDateTime={new Date()}
                    />
                </LocalizationProvider>
            </div>
               
                <Button id="btnID" variant='contained' onClick={setNewDate} >Send</Button>
            </Grid>

            <Grid xs={6}  >
            <div id="des-container">
                <TextareaAutosize id="des" minRows="5" placeholder="Enter new description" style={{width: 200, backgroundColor:'white'}}/>
                <br/>
                <Button id="btnID" variant='contained' onClick={sendNewDescription} >Submit description</Button>
            </div>
            </Grid>
           
            <Grid xs={6} direction="row">
            <div className="text">
                <h2>The request queue</h2>
                {requests.map((r) => (
                    <div className="membersList">
                        <div className="text">
                            <h3>{r}</h3>
                            <Button id="btnID" variant='contained' onClick={() => acceptRequestButton(r)} >Accept request</Button>
                        </div>
                    </div>
                ))}
            </div>
            </Grid>

            <Grid xs={6}>
            <div >
                <h2>Goldmatch requests</h2>
                <h3>You have {goldmatches.length} goldmatch(es)!</h3>
                {goldmatches.map((g) => (
                    <div className="membersList">
                        <div className="goldmatchElement">
                            <button className="goldmatchElement" onClick={() => matchWith(g)}>Match with: {g.groupName}</button>
                            <button className="goldmatchElement" onClick={() => deleteRequest(g)}>Delete request</button>
                        </div>
                    </div>
                ))}
            </div>
            </Grid>
        </Grid>
        </div>
       
        
        

    )
}
