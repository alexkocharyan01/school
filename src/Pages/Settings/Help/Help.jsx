import React, {useEffect, useState} from 'react';
import "./Help.scss";
import {useDispatch, useSelector} from 'react-redux';
import Search from './HelpSearch/Search';
import ChangeContainer from './ChangeContainer/ChangeContainer';
import {notification, clearData} from './HelpSlice';
import {Alert} from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";

export default function Help() {
    const [request, setRequest] = useState(false)

    const dispatch = useDispatch();
    const data = useSelector(((state) => state.helpData))
    const token = localStorage.getItem('ACCESS_TOKEN');

    const handleCreateNotification = (type, text) => {
        const value = {
            type,
            text
        }
        dispatch(notification({value, token}))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setRequest(false);
    };

    useEffect(() => {
        if (data.status) {
            setRequest(true)
            dispatch(clearData())
        }
    }, [data.status])

    return (
        <div className="help">
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={request}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="info" sx={{width: '100%'}}>
                    Notification has been successfully send.
                </Alert>
            </Snackbar>
            <div className="help_header">
                <h2>How can we help?</h2>
            </div>
            <Search/>
            <ChangeContainer/>
            <div>
                <div className="help_or">
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>
                <div className="help_button">
                    <button onClick={() => handleCreateNotification('REQUEST_CALL', 'Request a call')}>
                        <p>Request a call</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
