import React from "react";
import {Card} from "./card";

export const CardList = (props) => {
   console.log(props);
    return(
    <div>
        {props.groups.map((group) => (
            <Card key={group.id} group={group}></Card>
        ))}
    </div>)
}   