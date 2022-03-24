import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../../firebase-config";
import { db } from "../../../firestore";
import { collection, arrayRemove, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc, getDocFromServer, query, where, arrayUnion } from 'firebase/firestore'
import { getBottomNavigationUtilityClass } from "@mui/material";
import Button from '@material-ui/core/Button';
import "./matchCard.css";
import { makeStyles } from "@material-ui/core";
import PopUp from "../../../components/popup";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@mui/material/Grid';

export const MatchCard = (props) => {
    const [reloader, setReloader] = useState([]);
    const navi = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [severity, setSeverity] = useState("");


    //Popup
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const enterGroup = (id) => {
        navi("/group/" + id);
    }

    /**
       * A user can send a request to join the group. The admin of the group can then accept requests. 
       * 
       * The "key" part is not yet figured out. It works, but it is a little weird. 
       * 
       * @returns void to end the function
       */
    const requestToJoin = async () => {
        var key = false;
        if (!key) {
            if (auth.currentUser.email == props.group.owner) {
                setFeedbackMessage("You are the owner of this group!");
                setSeverity("error");
                console.log("Owner of group");
                setOpen(true);
                return;
            }
            props.group.members.map((m) => {
                if (m == auth.currentUser.email) {
                    setFeedbackMessage("Already in group");
                    setSeverity("error");
                    console.log("Already in group");
                    setOpen(true);
                    return;
                }
            });
            key = true;
            setFeedbackMessage("Group request sent!");
            setSeverity("success");
            setOpen(true);
        }

        if (key) {
            const docRef = doc(db, "groups", props.group.id);
            await updateDoc(docRef, {
                requests: arrayUnion(auth.currentUser.email)
            });
        }

    }

    const useStyles = makeStyles({
        gridContainer: {
            paddingTop: "10px",
            width: "700px",
            direction: "column",
            alignItems: "stretch",
            display: "inline-block",
            justifyContent: "center",
            xs: 12,
            md: 6,
            lg: 4,
            marginTop: "auto"
        },
        root: {
            textAlign: "center"
        },
        media: {
            height: 140
        },
        content: {

        }
    })

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia className={classes.media} image="https://st.depositphotos.com/2325841/2529/i/600/depositphotos_25293855-stock-photo-multi-ethnic-group-thumbs-up.jpg" />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.group.groupName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.group.interest}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.group.location}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        Insert Date Here
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.button}>
                    <div className="card-buttons">
                        <PopUp open={open} severity={severity} feedbackMessage={feedbackMessage} handleClose={handleClose}>
                        </PopUp>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
}