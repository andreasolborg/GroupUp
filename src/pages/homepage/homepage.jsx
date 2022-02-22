import React from "react";
import Navbar from "../../components/navbar";
import "./homepage.css";
import Card from "../../components/profileCard"
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles( {
    gridContainer: {
        paddingTop: '16%',
        paddingLeft: '35%', 
    }
})



function Homepage() {
    const classes = useStyles();
    return (
        <div className="homepage">
            <Navbar className="navbar"></Navbar>

            <Grid container spacing = {4} className={classes.gridContainer} >
                <Grid item xs={12} sm={6} md={4}>
                    <Card/>
                </Grid>
            </Grid>
        </div>
    );
};
export default Homepage;