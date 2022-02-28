import React from "react";
import { useNavigate, useParams } from "react-router-dom";



//This page holds information on a particular group. 
//Could contain: List of members, ask-to-join button, owner of group, group-activity, 

export default function Group() {

    const navi = useNavigate();


    /**
     * id is used for determining wich group that has been entered. This group-id also makes the URL for that group-page.
     */
    const { id } = useParams();
    console.log(id);



    /**
     * navigates back to the user-page with useNavigate()
     */
    const goBackButton = () => {
        navi("/user");
    }

    return (
        <div>
            <button onClick={goBackButton}>Go Back</button>
        </div>
    )
}