import React, {useEffect, useState} from 'react';
import "./ChangeContainer.scss"
import {useDispatch, useSelector} from 'react-redux';
import {notification, clearData} from '../HelpSlice';
import {Alert} from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";

export default function ChangeContainer() {
    const [open, setOpen] = useState(false)

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
        setOpen(false);
    };

    useEffect(() => {
        if (data.status) {
            setOpen(true)
            dispatch(clearData())
        }
    }, [data.status])

    return (
        <div className="change_page">
            <div className="first_container">
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="info" sx={{width: '100%'}}>
                        Notification has been successfully send.
                    </Alert>
                </Snackbar>
                <div className="component"
                     onClick={() => handleCreateNotification('CHANGE_PHONE', 'Phone number change')}>
                    <div className="change_teacher">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.8333 24.5V22.1667C19.8333 20.929 19.3417 19.742 18.4665 18.8668C17.5913 17.9917 16.4043 17.5 15.1667 17.5H5.83332C4.59565 17.5 3.40866 17.9917 2.53349 18.8668C1.65832 19.742 1.16666 20.929 1.16666 22.1667V24.5"
                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M10.5 12.8333C13.0773 12.8333 15.1667 10.744 15.1667 8.16667C15.1667 5.58934 13.0773 3.5 10.5 3.5C7.92268 3.5 5.83334 5.58934 5.83334 8.16667C5.83334 10.744 7.92268 12.8333 10.5 12.8333Z"
                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M26.8333 24.4997V22.1664C26.8326 21.1324 26.4884 20.1279 25.8549 19.3107C25.2214 18.4935 24.3345 17.9099 23.3333 17.6514"
                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M18.6667 3.65137C19.6705 3.90839 20.5602 4.49219 21.1956 5.31073C21.8309 6.12927 22.1758 7.136 22.1758 8.1722C22.1758 9.2084 21.8309 10.2151 21.1956 11.0337C20.5602 11.8522 19.6705 12.436 18.6667 12.693"
                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Change number</p>
                    </div>
                    <div className="change_container">
                        <svg width="13" height="26" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 27L14 14L1 1" stroke="#3DAFFF" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="second_container">
                <div className="component" onClick={() => handleCreateNotification('CHANGE_TEACHER', 'Teacher change')}>
                    <div className="change_teacher">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.8333 24.5V22.1667C19.8333 20.929 19.3417 19.742 18.4665 18.8668C17.5913 17.9917 16.4043 17.5 15.1667 17.5H5.83332C4.59565 17.5 3.40866 17.9917 2.53349 18.8668C1.65832 19.742 1.16666 20.929 1.16666 22.1667V24.5"
                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M10.5 12.8333C13.0773 12.8333 15.1667 10.744 15.1667 8.16667C15.1667 5.58934 13.0773 3.5 10.5 3.5C7.92268 3.5 5.83334 5.58934 5.83334 8.16667C5.83334 10.744 7.92268 12.8333 10.5 12.8333Z"
                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M26.8333 24.4997V22.1664C26.8326 21.1324 26.4884 20.1279 25.8549 19.3107C25.2214 18.4935 24.3345 17.9099 23.3333 17.6514"
                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M18.6667 3.65137C19.6705 3.90839 20.5602 4.49219 21.1956 5.31073C21.8309 6.12927 22.1758 7.136 22.1758 8.1722C22.1758 9.2084 21.8309 10.2151 21.1956 11.0337C20.5602 11.8522 19.6705 12.436 18.6667 12.693"
                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>Change teacher</p>
                    </div>
                    <div className="change_container">
                        <svg width="13" height="26" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 27L14 14L1 1" stroke="#3DAFFF" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
