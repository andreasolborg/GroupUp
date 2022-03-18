import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, TextareaAutosize, TextField, Box, IconButton, InputAdornment } from '@mui/material';
import React from 'react';
//import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid } from '@mui/material';


export default function GroupOwnerPanel({
    hideAdminButton,
    enterMatchingButton,
    updateGroupDetails,
    removeUserButton,
    setNewDate,
    sendNewDescription,
    requests,
    leaveGroup,
    addUserButton,
    setDateTime,
    dateTime,
    acceptRequestButton }) {

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
        </Grid>
        </div>
       
        
        

    )
}
