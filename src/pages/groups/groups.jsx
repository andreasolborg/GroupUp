import React from "react";
import { useState, useEffect } from "react";
import "./groups.css";
import { db } from "../../firestore";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import { getBottomNavigationUtilityClass, TextField } from "@mui/material";
import MediaCard from "./card";
import CardList from "./cardlist";
import "./card.css";
import Button from '@material-ui/core/Button';
import Navbar from "../../components/navbar";
import DateTimePicker from 'react-datetime-picker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from "@material-ui/core";


export default function Groups() {

    const [groups, setGroups] = useState([]);
    const [groupTemp, setGroupTemp] = useState([]);

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [timeToggled, setTimeToggled] = useState(false);

    const groupsCollectionReference = collection(db, "groups");
    const navi = useNavigate();
    

    const goToMain = () => {
        navi("/user");
    }



    useEffect(() => {
        const getGroups = async () => {
            const querySnapshot = await getDocs(groupsCollectionReference);
            setGroups(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setGroupTemp(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        };
        getGroups();
    }, []);


    /**
     * function gets called when the input in the textfields gets updated
     * 
     * Checks first whether the inputs from "interest" and "location" match any goups.
     * Then it checks if "timeToggled", which indicates that the user have filtered by time/date as well.
     * 
     * Adds the correct groups to the array to be displayed
     * 
     * TODO: Triple if-statement is probably not ideal
     */
    const searchBarChanged = () => {
        var arrRes = [];
        groups.forEach((g) => {
            if (g.interest.toLowerCase().includes(document.getElementById("searchInput").value.toLowerCase()) &&
                g.location.toLowerCase().includes(document.getElementById("locationSearchInput").value)) {
                if (timeToggled) {
                    if (new Date(g.datetime.seconds * 1000) > startTime && new Date(g.datetime.seconds * 1000) < endTime) {
                        arrRes.push(g);
                    }
                } else {
                    arrRes.push(g);
                }
            }
        });
        setGroupTemp(arrRes);
    }

    /**
     * Gets called when a user push the "Apply Time Filter" button.
     * 
     */
    const filterByTime = () => {
        setTimeToggled(true);
        var arrRes = [];

        groupTemp.forEach((g) => {
            if (new Date(g.datetime.seconds * 1000) > startTime && new Date(g.datetime.seconds * 1000) < endTime) {
                arrRes.push(g);
            }
        });
        setGroupTemp(arrRes);
        document.getElementById("filterByTimeButton").style = "color: green";
    }


    /**
     * Deactivates the time filter
     */
    const cancelTimeFilter = () => {
        setTimeToggled(false);
        var arrRes = [];
        groups.forEach((g) => {
            if (g.interest.toLowerCase().includes(document.getElementById("searchInput").value.toLowerCase()) &&
                g.location.toLowerCase().includes(document.getElementById("locationSearchInput").value)) {
                arrRes.push(g);
            }
        });
        setGroupTemp(arrRes);
        document.getElementById("filterByTimeButton").style = "color: black";
    }

    const delay = (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const hideFilterButton = () => {
        document.getElementById("divForGroupsFilter").style = "display: none";
        document.getElementById("showFilterFunction").style = "display: inline-block";

    }

    const showFilterButton = () => {
        document.getElementById("divForGroupsFilter").style = "display: inline-block";
        document.getElementById("showFilterFunction").style = "display: none";
    }




    return(
        <div className="outerDiv">
        <Navbar></Navbar>
        <div className="filterGroups">
            <h1>GROUPS PAGE</h1>
            <div id="showFilterFunction">
                <Button id="filterButtons" variant="contained" onClick={showFilterButton}>Filter groups</Button>
            </div>
            <div id="divForGroupsFilter" style={{display:'none'}}>
                <Button id="filterButtons" variant="contained" onClick={hideFilterButton}>Hide filter function</Button>
                <br/>
                <TextField variant="standard" id="searchInput" placeholder="search by interest..." onChange={() => { searchBarChanged() }} />
                <br />
                <br />
                <TextField variant="standard" id="locationSearchInput" placeholder="search by location..." onChange={() => { searchBarChanged() }} />

                <br />
                <br />
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Start time"
                            value={startTime}
                            onChange={(newValue) => {
                                setStartTime(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="End time"
                            value={endTime}
                            onChange={(newValue) => {
                                setEndTime(newValue);
                            }}
                        />
                    </LocalizationProvider>
                    <br />
                    <Button variant="contained" id="filterButtons" onClick={filterByTime}>Apply Time Filter</Button>
                    <Button variant="contained" id="filterButtons" onClick={() => cancelTimeFilter()}>Remove time filter</Button>
                </div>
            </div>
        </div>
        <div className="cardBackground">
            <CardList groups={groupTemp} />
        </div>
    </div>
    )
}
