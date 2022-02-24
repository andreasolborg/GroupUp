import React from "react";
import MUICard from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

export const Card = (props) => {

    const navi = useNavigate();

    const enterGroup = (id) => {
       navi("/group/"+ id);
    }


    return (
    <MUICard variant="outlined">
        <h2> Owner of group: {props.group.owner} </h2>
        <p>Group members</p>
        <div> {props.group.members?.map((member) => (
            <p>{member}</p>
        ))}</div>
        <button onClick={() => {enterGroup(props.group.id)}}>Enter group</button>
    </MUICard>
    )
}