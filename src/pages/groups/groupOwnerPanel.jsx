import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, TextareaAutosize, TextField, Box, IconButton, InputAdornment} from '@mui/material';
import React from 'react';
//import DateTimePicker from 'react-datetime-picker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function GroupOwnerPanel({ 
    hideAdminButton, 
    updateGroupDetails, 
    removeUserButton, 
    setNewDate, 
    sendNewDescription, 
    requests, 
    leaveGroup,
    addUserButton,
    setDateTime,
    dateTime, 
    acceptRequestButton }) 
    {

    return (
        
        <div id="admin">
            
            <div className="text">
                <Button variant="contained" onClick={hideAdminButton} style={{backgroundColor:'#DDEEF5', color:'black'}}>Hide Admin Priviliges</Button>
                <h2>Gruppeleder</h2>
                <p>These functions are hidden for regular members</p>

                <div className="update-details">
                    <h3>Update Group Details</h3>
                    <TextField placeholder="Enter a group name" id="groupNameInput" variant='outlined' style={{backgroundColor:"white"}}/>
                    <TextField placeholder="Enter a new interest" id="interestInput" style={{backgroundColor:"white"}}/>
                    <TextField placeholder="Enter a new location" id="locationInput" style={{backgroundColor:"white"}}/>
                </div>
                <Button variant="contained" onClick={updateGroupDetails} style={{backgroundColor:'#DDEEF5', color:'black'}}>Send</Button>


            </div>
            <div className="remove-users">
                <h3>Remove users</h3>
                <TextField placeholder="Enter user-mail" id="removeUserInput" style={{backgroundColor:"white"}}
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
            <div className="remove-users">
                <h3>Add users</h3>
                <TextField placeholder="Enter user-mail" id="addUserInput" style={{backgroundColor:"white"}} 
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
                <Button variant='contained' onClick={setNewDate} style={{backgroundColor:'#DDEEF5', color:'black'}}>Send</Button>
            

            <div id="des-container">
                <TextareaAutosize id="des" minRows="5" placeholder="Enter new description" style={{width: 200, backgroundColor:'white'}}/>
                <Button variant='contained' onClick={sendNewDescription} style={{backgroundColor:'#DDEEF5', color:'black'}}>Submit description</Button>
            </div>

            <div className="text">
                <h2>The request queue</h2>
                {requests.map((r) => (
                    <div className="membersList">
                        <div className="text">
                            <h3>{r}</h3>
                            <Button variant='contained' onClick={() => acceptRequestButton(r)} style={{backgroundColor:'#DDEEF5', color:'black'}}>Accept request</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="contained" className="obsButton" onClick={leaveGroup} style={{backgroundColor:'#DDEEF5', color:'black'}}>Delete Group</Button>
            </div> 
       
        
        

    )
}
