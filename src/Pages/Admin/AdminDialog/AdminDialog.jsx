import React, {useEffect, useState} from 'react';
import "./AdminDialog.scss";
import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Close, Visibility, VisibilityOff} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {clearData, createModerator} from "../AdminAddModeratrSlice";
import {Alert} from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";

const useStyles = makeStyles(() => ({
    dialog: {
        height: '68vh',
        backgroundColor: 'rgba(228, 241, 250, 0.91)'
    }
}));

export default function AdminDialog({show, setShow}) {

    const [showPassword, setShowPassword] = useState({
        "old_password": false,
        "passwordConfirm": false,
    })
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const classes = useStyles()

    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}, resetField} = useForm();

    const token = localStorage.getItem('ACCESS_TOKEN');

    const addModerator = useSelector(((state) => state.addModerator))

    const handleClick = (data) => {
        // const newObj = Object.entries(data)
        // const filtered = arr.filter(([key]) => key !== 'password' && key !== 'passwordConfirm' && key !== 'phone')
        //const newObj = Object.fromEntries(filtered)
        const values = {
            data,
            token
        }
        dispatch(createModerator(values));
        setOpenSnackbar(false)

        setTimeout(() => {
            setShow(false)
        }, 2000)
    }

    const handleClose = () => {
        setShow(false)
        resetField('firstname')
        resetField('lastname')
        resetField('phone')
        resetField('password')
        resetField('confirmpassword')
        resetField('email')
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const togglePassword = (id) => {
        setShowPassword({
            ...showPassword,
            [id]: !showPassword[id]
        });
    };

    useEffect(() => {
        if (addModerator.data.status === 'success') {
            setMessage('Moderator Created')
            setOpenSnackbar(true);
            setTimeout(() => {
                resetField('firstname')
                resetField('lastname')
                resetField('phone')
                resetField('password')
                resetField('passwordConfirm')
                resetField('email')
                setShow(false)
                setOpenSnackbar(false);
                dispatch(clearData())
            }, 2000);
        }
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 3000)
            setMessage('does not much')
            setShow(true)
        }
    }, [addModerator.data, error, addModerator.error, show])

    return (
        <Dialog
            open={show}
            fullWidth
            maxWidth="xs"
            classes={{paper: classes.dialog}}
        >
            <DialogTitle id="alert-dialog-slide-title">
                <div className="header_container">
                    <div className="admin_dialog_header">
                        <p>Add Moderator</p>
                    </div>
                    <div className="admin_dialog_button">
                        <button onClick={handleClose}>
                            <Close/>
                        </button>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleClick)}>
                    <div className="dialog_content">
                        <div className="dialog_content_person_info">
                            <div className="dialog_content_first_name">
                                <label htmlFor="firstname">First name<span>*</span></label>
                                <input className='input'
                                       type="text"
                                       id="firstname"
                                       {...register("firstname", {required: true, pattern: /[a-z]/i})}
                                />
                            </div>
                            <div className="dialog_content_last_name">
                                <label htmlFor="lastname">Last Name<span>*</span></label>
                                <input className='input'
                                       type="text"
                                       id="lastname"
                                       {...register("lastname", {required: true})}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone<span>*</span></label>
                                <input className='input'
                                       type="number"
                                       id="phone"
                                       {...register("phone", {required: true, valueAsNumber: true})}
                                />
                            </div>
                            <div className="dialog_content_password">
                                <label htmlFor="password">Password<span>*</span></label>
                                <input className='input'
                                       type={showPassword.password ? "password" : "text"}
                                       id="password"
                                       {...register("password", {required: true})}
                                />
                                <div className="dialog_password" onClick={() => togglePassword("password")}>
                                    {showPassword.password ? <Visibility/> : <VisibilityOff/>}
                                </div>
                            </div>
                            <div className="dialog_content_password">
                                <label htmlFor="passwordConfirm">Confirm your password<span>*</span></label>
                                <input className='input'
                                       type={showPassword.passwordConfirm ? "password" : "text"}
                                       id="passwordConfirm"
                                       {...register("passwordConfirm", {required: true})}
                                />
                                <div className="dialog_password" onClick={() => togglePassword("passwordConfirm")}>
                                    {showPassword.passwordConfirm ? <Visibility/> : <VisibilityOff/>}
                                </div>
                            </div>
                            <div className="dialog_content_config_password">
                                <label htmlFor="email">Email<span>*</span></label>
                                <input className='input'
                                       type="mail"
                                       id="email"
                                       {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                                />
                            </div>
                            <div className="dialog_content_email">
                                <label htmlFor="gender">Gender<span>*</span></label>
                                <select name="Gender" className='input'>
                                    <option
                                        id='female'
                                        name='gender'
                                        value="female"
                                        {...register("gender", {required: true})}
                                    >Female
                                    </option>
                                    <option
                                        id='male'
                                        name='gender'
                                        value="male"
                                        {...register("gender", {required: true})}
                                    >Male
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="dialog_content_button">
                            <button>Add</button>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="info" sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
        </Dialog>
    )
}
