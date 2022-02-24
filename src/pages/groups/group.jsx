import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Group() {

    const navi = useNavigate();

    const { id } = useParams();
    console.log(id);


    const goBackButton = () => {
        navi("/user");
    }

    return (
        <div>
            <button onClick={goBackButton}>Go Back</button>
        </div>
    )
}