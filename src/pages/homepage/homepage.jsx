import React from "react";
import Navbar from "../../components/navbar";
import "./homepage.css";
import pic from "./Climbing.png"
import { Button } from "@material-ui/core";

const Homepage = () => {
    return (
        <div className="homepage">
            <Navbar className="navbar"></Navbar>
            <div className="group">
                    <h1>Interest</h1>
                    <img source={pic} alt="pic"/>
                    <Button className="button" variant="outlined">Match</Button>
                    <div className="info">
                        <p>Interest: </p>
                        <p>Age: </p>
                        <p>Meeting time: </p>
                    </div>
            </div>
        </div>
    );
};
export default Homepage;