import React from "react";
import {MediaCard} from "./card";
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
   /* gridContainer: {
    paddingTop: "50px",
    direction: "column",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    xs: "auto", 
    sm: "6",
    md: "4",
    backgroundColor: "orange",
 */   
    } 
  })

export const CardList = (props) => {
    const classes = useStyles();
    return(
    <div className="testdiv">
        <Grid container spacing = {2} className={classes.gridContainer}>
        {props.groups.map((group) => (
            <MediaCard key={group.id} group={group}></MediaCard>
        ))} 
        </Grid>
    </div>)
}   