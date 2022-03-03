import * as React from 'react';
import { useState } from "react";

import List from '@mui/material/List';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import InterestList from './interestList';


export default function Interests() {
    
    const [interests, setInterests] = useState([]);
    const [interest, setInterest] = useState("");

    function handleInterestTextChange(e) {
        setInterest(e.target.value);
    }

    function addInterest() {
        if (!interests.includes(interest)) {
            setInterests(interests => [...interests, interest]);
        }
    }

    return (
        <>
            <TextField
                fullWidth
                name="interest"
                label="Interest"
                type="text"
                id="interest"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" color="primary" onClick={addInterest}>
                            <AddIcon/>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                value={interest}
                onChange={handleInterestTextChange}
            />

            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 300,
                    '& ul': { padding: 0 },
                }}
                subheader={<li/>}
                >
                <InterestList interests={interests}></InterestList>
            </List>
        </>
    )
}