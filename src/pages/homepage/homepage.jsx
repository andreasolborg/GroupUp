import React from "react";
import Navbar from "../../components/navbar";
import "./homepage.css";
import Card from "../../components/profileCard"
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";

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
            <div className = "gridCards">
            <Grid container spacing={3}>
                    <Grid item xs>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Grid>
                    <Grid item xs>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    </Grid>
                </Grid>
            <Grid container spacing = {4} className={classes.gridContainer} >
                <Grid item xs={12} sm={6} md={4}>
                    <Card/>
                </Grid>
            </Grid>
            </div>

        </div>
    );
};
export default Homepage;