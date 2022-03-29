import * as React from 'react';
import { useState } from "react";

import List from '@mui/material/List';
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import InterestList from './interestList';


export default function Interests({ interests, setInterests, error, setError }) {

    const [interest, setInterest] = useState("");

    function handleInterestTextChange(e) {
        setInterest(e.target.value);
    }

    function addInterest() {
        if (!interests.includes(interest) && interest.trim().length != 0) {
            setInterests(interests => [...interests, interest]);
            setError(false);
        }
    }

    return (
        <Grid item xs={12}>
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
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                value={interest}
                onChange={handleInterestTextChange}
                error={error}
                helperText={error ? "You need at least one interest" : ""}
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
                subheader={<li />}
            >
                <InterestList interests={interests}></InterestList>
            </List>
        </Grid>
    )
}