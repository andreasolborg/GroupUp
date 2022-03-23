import React from "react";
import Navbar from "../../components/navbar";
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core";
import Card from "./components/groupCard";
import image from './components/Climbing.png';

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '10px',
    paddingLeft: '100px',
    
  }
})

function Groups() {
  const classes = useStyles();
  return (
    <><div className="groups">
    <div><Navbar></Navbar></div>
    <Grid container spacing = {2} className={classes.gridContainer}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
        leader="Karan" 
        interest="klatring" 
        location="trondheim"
        ageGroup="22"
        imageURL={image}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card 
        leader="Karan" 
        interest="klatring" 
        location="trondheim"
        ageGroup="22"
        imageURL={image}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card 
        leader="Karan" 
        interest="klatring" 
        location="trondheim"
        ageGroup="22"
        imageURL={image}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card leader="Karan" 
        interest="klatring" 
        location="trondheim"
        ageGroup="22"
        imageURL={image}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card leader="Karan" 
        interest="klatring" 
        location="trondheim"
        ageGroup="22"
        imageURL={image}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card leader="Karan" 
        interest="klatring" 
        location="trondheim"
        ageGroup="22"
        imageURL={image}/>
      </Grid>
    </Grid>
    </div></>
    
  );
}

export default Groups;
