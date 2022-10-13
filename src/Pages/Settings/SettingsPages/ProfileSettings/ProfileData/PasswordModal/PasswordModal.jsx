import React, {useEffect, useState} from 'react';
import {Dialog} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {changePassword, clearData} from "./userUpdatePasswordSlice";
import {Alert} from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import './PasswordModal.scss'
import CloseIcon from '@mui/icons-material/Close';

function PasswordModal({open, setOpen}) {
    const [passwordShown, setPasswordShown] = useState({
        "old_password": false,
        "new_password": false,
        "confirm_password": false,
    });
    const [error, setError] = useState(false);
    const [lengthError, setLengthError] = useState(false);
    const {register, handleSubmit, formState: {errors}, resetField} = useForm();
    const [message, setMessage] = useState('');
    const [open2, setOpen2] = useState(false);

    const dispatch = useDispatch();

    const data = useSelector(((state) => state.userUpdatePassword));

    const token = localStorage.getItem('ACCESS_TOKEN')

    const passwordRegex = new RegExp(/^(?=.*[a-z])+(?=.*[@$!%*#?&.-])(?=.{8,})/);

    const handleClose = () => {
        setOpen(false);
        resetField('password')
        resetField('newPassword')
        resetField('passwordConfirm')
    };

    const handleChange = (value) => {
        if (value.newPassword !== value.passwordConfirm) {
            setError(true)
            return
        }
        if (!passwordRegex.test(value.newPassword)) {
            setLengthError(true)
            return
        }
        dispatch(changePassword({value, token}))
    }

    const togglePassword = (id) => {
        setPasswordShown({
            ...passwordShown,
            [id]: !passwordShown[id]
        });
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };

    useEffect(() => {
        if (data.status) {
            setMessage('password change')
            setOpen2(true);
            setTimeout(() => {
                setOpen(false);
                resetField('password')
                resetField('newPassword')
                resetField('passwordConfirm')
            }, 3000)
            dispatch(clearData())
        }
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 3000)
            setMessage('new password and confirm password does not much')
            setOpen2(true);
            return
        }
        if (lengthError) {
            setTimeout(() => {
                setLengthError(false)
            }, 3000)
            setMessage('password must be longer than or equal to 6 characters')
            setOpen2(true);
            return
        }

        if (data.error) {
            setMessage('old password wrong')
            setOpen2(true);
            dispatch(clearData())
        }
    }, [data, error, data, lengthError])

    return (
        <div>
            <Dialog className='dialogPass' open={open} onClose={handleClose} maxWidth="lg">
                <div className="dialog_body">
                    <div className='dialog_header'>
                        <p> Change password</p>
                        <CloseIcon className='closeX' onClick={handleClose}></CloseIcon>
                    </div>
                    <form onSubmit={handleSubmit(handleChange)}>
                        <div className='inputs'>
                            <div className='input'>
                                <label htmlFor="old_password">Old Password</label>
                                <input
                                    className={errors.password ? 'error' : ''}
                                    type={passwordShown.old_password ? "text" : "password"}
                                    id='old_password'
                                    {...register("password", {required: true})}
                                />
                                <div className="show_hide" onClick={() => togglePassword('old_password')}>
                                    {passwordShown.old_password ? <VisibilityOff/> : <Visibility/>}
                                </div>
                            </div>
                            <div className='input'>
                                <label htmlFor="new_password">New Password</label>
                                <input
                                    className={errors.newPassword ? 'error' : ''}
                                    type={passwordShown.new_password ? "text" : "password"}
                                    id='new_password'
                                    {...register("newPassword", {required: true})}
                                />
                                <div className="show_hide" onClick={() => togglePassword('new_password')}>
                                    {passwordShown.new_password ? <VisibilityOff/> : <Visibility/>}
                                </div>
                            </div>
                            <div className='input'>
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input
                                    className={errors.passwordConfirm ? 'error' : ''}
                                    type={passwordShown.confirm_password ? "text" : "password"}
                                    id='confirm_password'
                                    {...register("passwordConfirm", {required: true})}
                                />
                                <div className="show_hide" onClick={() => togglePassword('confirm_password')}>
                                    {passwordShown.confirm_password ? <VisibilityOff/> : <Visibility/>}
                                </div>
                            </div>
                        </div>
                        <div className='saveBtn'>
                            <button type='submit' className='btn'>Save</button>
                        </div>
                    </form>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={open2}
                    autoHideDuration={3000}
                    onClose={handleClose2}>
                    <Alert
                        onClose={handleClose2}
                        severity="info" sx={{width: '100%'}}>
                        {message}
                    </Alert>
                </Snackbar>
            </Dialog>
        </div>
    )
}

export default PasswordModal
