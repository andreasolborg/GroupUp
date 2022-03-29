import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../firebase-config";
import { db } from "../../firestore";
import { updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { CircularProgress } from "@mui/material";
import Button from '@material-ui/core/Button';
import "./card.css";
import { makeStyles } from "@material-ui/core";
import PopUp from "../../components/popup";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { storage } from "../../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

export const MediaCard = (props) => {
    const navi = useNavigate();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [severity, setSeverity] = useState("");


    //Popup
    const [open, setOpen] = useState(false);

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
        root: {
            textAlign: "center"
        },
        media: {
            height: 140
        },
    })

    const classes = useStyles();

    const [url, setUrl] = useState("");

    useEffect(() => {
        const loadImage = () => {
            const pathReference = ref(storage, "/group/" + props.group.id);
            var temp = "";
            getDownloadURL(pathReference).then((url) => {
                //insert url into img tag in html
                setUrl(url);
            }).catch((error) => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        getStandardImage();
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }

            });
        }

        loadImage();
    }, []);

    const getStandardImage = () => {
        const pathRef = ref(storage, "/group/zlatan.jpeg");
        getDownloadURL(pathRef).then((url) => {
            setUrl(url);
        });
    }

    return (
        <Card className={classes.root}>
            {
                url ? <CardMedia className={classes.media} image={url} /> : <CircularProgress />
            }
            <CardContent >
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
                    {new Date(props.group.datetime.seconds * 1000).toUTCString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button id="visitGroupButton" onClick={() => { enterGroup(props.group.id) }} variant="outlined">Visit group</Button>
                <Button id="requestButton" onClick={() => { requestToJoin() }} variant="outlined">Request to join group</Button>
            </CardActions>
            <PopUp open={open} severity={severity} feedbackMessage={feedbackMessage} handleClose={handleClose} />
        </Card>
    );
}