import React, { useEffect, useState } from 'react';
import "./ProfileData.scss"
import {clearData, emailChangeAsync, nameChangeAsync} from "../../../SettingsSlice";
import { useDispatch } from "react-redux";
import PasswordModal from "./PasswordModal/PasswordModal";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/lab";

function ProfileData({ settings, data, changeName, setChangeName }) {
    const [disable, setDisable] = useState(true)
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');
    const [fullName, setFullName] = useState({});
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const dispatch = useDispatch();
    const token = localStorage.getItem('ACCESS_TOKEN');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDisable = () => {
        setDisable(!disable);
    }

    const handleSaveEmail = () => {
        const newValue = {
            email: { newEmail: value },
            token
        }
        dispatch(emailChangeAsync(newValue))
    }

    const handleKeyPressSaveEmail = (event) => {
        if (event.key === 'Enter') {
            handleSaveEmail();
        }
    }

    const handleChangeName = () => {
        setChangeName(true)
    }

    const handleName = (e) => {
        const re = /^[A-Za-z]+$/;
        if (re.test(e.target.value)) {
            setFullName({
                ...fullName,
                [e.target.name]: e.target.value,
            });
        }
    }

    const handleSaveChangedName = () => {
        const values = {
            name: {
                ...fullName,
                phone: parseInt(data.phone)
            },
            token
        }
        dispatch(nameChangeAsync(values))
        setChangeName(false)
    }

    const handleKeyPressSaveChangedName = (event) => {
        if (event.key === 'Enter') {
            handleSaveChangedName();
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };

    useEffect(() => {
        setValue(data.email)
        setFullName({ firstname: data.firstname, lastname: data.lastname })
    }, [data])

    useEffect(() => {
        if (settings.emailError) {
            setMessage('Email already presented')
            setOpen2(true);
            dispatch(clearData())
        }
        if (settings.emailData) {
            setMessage('Please check your email.')
            setOpen2(true);
            setDisable(!disable);
            dispatch(clearData())
        }
    }, [settings.emailError, settings.emailData])

    return (
        <div className="profile_data">
            <div className='edit_name_lastname'>
                {!changeName ?
                    <div className="name_lastName">
                        <p>{data.firstname} {data.lastname}</p>
                        <button className='editIcon' onClick={handleChangeName}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none">
                            <path d="M11.3333 1.99955C11.5083 1.82445 11.7162 1.68556 11.945 1.5908C12.1738 1.49604 12.419 1.44727 12.6666 1.44727C12.9142 1.44727 13.1594 1.49604 13.3882 1.5908C13.617 1.68556 13.8248 1.82445 13.9999 1.99955C14.175 2.17465 14.3139 2.38252 14.4087 2.61129C14.5034 2.84006 14.5522 3.08526 14.5522 3.33288C14.5522 3.58051 14.5034 3.82571 14.4087 4.05448C14.3139 4.28325 14.175 4.49112 13.9999 4.66622L4.99992 13.6662L1.33325 14.6662L2.33325 10.9996L11.3333 1.99955Z" stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </button>
                    </div>
                    :
                    <div className='edit_container'>
                        <input
                            name='firstname'
                            value={fullName.firstname ? fullName.firstname : ""}
                            onChange={handleName}
                            onKeyPress={handleKeyPressSaveChangedName}
                        />
                        <input
                            value={fullName.lastname ? fullName.lastname : ""}
                            name='lastname'
                            onChange={handleName}
                            onKeyPress={handleKeyPressSaveChangedName}
                        />
                        <button
                            onClick={() => handleSaveChangedName()}>
                            Save</button>
                    </div>
                }
            </div>
            <div className="mail changes">
                <h3>Email</h3>
                <div className='withEditIcon'>
                    {disable ?
                        <input
                            type="email"
                            value={data.email ? data.email : ""}
                            disabled
                            className={!disable ? 'input' : undefined}
                        />
                        :
                        <input
                            type="email"
                            value={value ? value : ""}
                            className={!disable ? 'input' : undefined}
                            onChange={e => setValue(e.target.value)}
                            onKeyPress={handleKeyPressSaveEmail}
                        />
                    }
                    <div className="button_block">
                        {disable ?
                            <button onClick={handleDisable}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M11.3333 1.99955C11.5083 1.82445 11.7162 1.68556 11.945 1.5908C12.1738 1.49604 12.419 1.44727 12.6666 1.44727C12.9142 1.44727 13.1594 1.49604 13.3882 1.5908C13.617 1.68556 13.8248 1.82445 13.9999 1.99955C14.175 2.17465 14.3139 2.38252 14.4087 2.61129C14.5034 2.84006 14.5522 3.08526 14.5522 3.33288C14.5522 3.58051 14.5034 3.82571 14.4087 4.05448C14.3139 4.28325 14.175 4.49112 13.9999 4.66622L4.99992 13.6662L1.33325 14.6662L2.33325 10.9996L11.3333 1.99955Z" stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg></button>
                            :
                            <button onClick={() => handleSaveEmail()}>Save</button>
                        }
                    </div>
                </div>
            </div>
            <div className="gender changes">
                <h3>Gender</h3>
                <p>{data.gender}</p>
            </div>
            <div className="phon_namber changes">
                <h3>Phone</h3>
                <p>{data.phone}</p>
            </div>
            <div className="password changes">
                <h3>Password</h3>
                <div className='withEditIcon'>
                    <p>*******</p>
                    <div className="button_block">
                        <button onClick={handleClickOpen}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.3333 1.99955C11.5083 1.82445 11.7162 1.68556 11.945 1.5908C12.1738 1.49604 12.419 1.44727 12.6666 1.44727C12.9142 1.44727 13.1594 1.49604 13.3882 1.5908C13.617 1.68556 13.8248 1.82445 13.9999 1.99955C14.175 2.17465 14.3139 2.38252 14.4087 2.61129C14.5034 2.84006 14.5522 3.08526 14.5522 3.33288C14.5522 3.58051 14.5034 3.82571 14.4087 4.05448C14.3139 4.28325 14.175 4.49112 13.9999 4.66622L4.99992 13.6662L1.33325 14.6662L2.33325 10.9996L11.3333 1.99955Z" stroke="#3398DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></button>
                    </div>
                </div>
            </div>
            <PasswordModal open={open} setOpen={setOpen} />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                open={open2}
                autoHideDuration={3000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="info" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ProfileData
