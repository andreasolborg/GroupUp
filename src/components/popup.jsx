import {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PopUp({open, severity, feedbackMessage, handleClose}) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {feedbackMessage}
            </Alert>
        </Snackbar>
    )
};



