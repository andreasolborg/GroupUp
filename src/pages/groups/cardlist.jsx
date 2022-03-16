import React from "react";
import {MediaCard} from "./card";
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    gridContainer: {
    paddingTop: "20px",
    direction: "column",
    alignItems: "stretch",
    display: "flex",
    justifyContent: "center",
    xs: 12, 
    md: 6,
    lg: 4
    } 
  });


export default function CardList( {groups} ) {
    const classes = useStyles();
    return(
        <Grid container spacing = {5} className={classes.gridContainer}>
            {groups.map((group) => (
                <Grid key={group.id} item>
                    <MediaCard group={group}></MediaCard>
                </Grid>
            ))} 
        </Grid>
    );
}   