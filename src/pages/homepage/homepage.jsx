import React from "react";
import Navbar from "../../components/navbar";
import "./homepage.css";
import pic from "./Climbing.png"
import { Button } from "@material-ui/core";
import Card from "../../components/profileCard"

const Homepage = () => {
    return (
        <div className="homepage">
            <Navbar className="navbar"></Navbar>
            <div className="cardGroup">
                <Card className="profileCard"></Card>
            </div>
        </div>
        
    );
};
export default Homepage;