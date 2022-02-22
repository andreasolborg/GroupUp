import React from "react";
import Navbar from "../../components/navbar";
import Grid from '@mui/material/Grid';
import Card from "../../components/Card";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  gridContainer: {
    paddingTop: '10px',
    
  }
})


function Matches() {
  const classes = useStyles();
  return (
    <><div className="matches">
    <div><Navbar></Navbar></div>
    <Grid container spacing = {4} className={classes.gridContainer}>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
    </Grid>
    </div></>
    
  );
}

export default Matches;