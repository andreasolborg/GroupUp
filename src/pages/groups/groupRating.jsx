import { useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firestore";
import { Rating } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

export default function GroupRating( {groupId} ) {
    const [userRating, setUserRating] = useState(0);
    const [ratingsNum, setRatings] = useState(0);
    const [emailString, setEmailString] = useState("");

    const groupRef = doc(db, "groups", groupId);


    /**
     * Sets the emailstring according to currently logged in user.
     * Updates the displayed rating and number of ratings.
     */
    useEffect( () => {
        onAuthStateChanged(auth, (currentUser) => {
            setEmailString(currentUser.email.replaceAll(".", "-"));
        });
        updateRatings();
    }, []);


    /**
     * Sets the displayed average rating and the displayed number of ratings based on data from firebase.
     */
    const updateRatings = async () => {
        const docSnap = await getDoc(groupRef);

        if (docSnap.exists()) {
            const ratings = Object.values(docSnap.data().ratings);
            
            let sum = 0;
            ratings.forEach(rating => {
                sum += rating;
            });

            setUserRating(sum/ratings.length);
            setRatings(ratings.length);
        }
        else {
            console.log("No such document");
        }
    }


    /**
     * Sets the displayed rating to the value of e. 
     * Also updates the firestore database to include the new value.
     * @param {Object} e 
     */
    const handleRatingChange = (e) => {
        const value = parseFloat(e.target.value);

        setUserRating(value);

        const obj = {};
        obj["ratings." + emailString] = value;
        updateDoc(groupRef, obj);
    }


    return (
        <>
            <Rating precision={0.5} value={userRating} onChange={handleRatingChange}/>
            <p>{`Ratings: (${ratingsNum})`}</p>
        </>
    );
}