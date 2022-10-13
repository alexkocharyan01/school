import React, {useEffect, useState} from 'react';
import LeftBlock from "../../Components/LeftBlock/LeftBlock";
import logo from "../../Assets/login_logo.png";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import './RecoverPassword.scss';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {clearData, resetPasswordAsync} from "./ResetPasswordSlice";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const RecoverPassword = () => {

    const [passwordShown, setPasswordShown] = useState({
        "password": false,
        "passwordConfirm": false,
    });
    const [snackbarError, setSnackbarError] = useState(false);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const resetPassword = useSelector((state) => state.resetPassword)

    const {code} = useParams();
    const {id} = useParams();

    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleClick = (data) => {
        if (data.password !== data.passwordConfirm) {
            setMessage('Passwords did not match')
            setSnackbarError(true);
            return
        }
        const value = {
            ...data,
            code,
        }
        dispatch(resetPasswordAsync({value, id}))
    }

    const togglePassword = (id) => {
        setPasswordShown({
            ...passwordShown,
            [id]: !passwordShown[id]
        });
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    })

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
        setSnackbarError(false)
    };

    useEffect(() => {
        if (resetPassword.status) {
            setMessage('Password was changed')
            setOpen(true);
            dispatch(clearData())
        }
        if (resetPassword.error) {
            setMessage(resetPassword.errorMessage)
            setSnackbarError(true);
            dispatch(clearData())
        }
    }, [resetPassword])

    return (
        <div className='recover_password'>
            <Container>
                <LeftBlock/>
                <div className="right">
                    <div className="right_container">
                        <div className="log_in_btn">
                            <img src={logo} alt="logo" className='recover_pass_logo'/>
                        </div>
                        <h3>Recover Password</h3>
                        <div className="forget_inputs">
                            <form onSubmit={handleSubmit(handleClick)}>
                                <div className="input_block">
                                    <div className='input'>
                                        <label htmlFor="password">New password<span>*</span></label>
                                        <input
                                            className={errors.password ? 'error' : ''}
                                            type={passwordShown.password ? "text" : "password"}
                                            id='password'
                                            {...register("password", {required: true})}
                                        />
                                        <div className="show_hide" onClick={() => togglePassword('password')}>
                                            {passwordShown.password ? <VisibilityOff/> : <Visibility/>}
                                        </div>
                                    </div>
                                </div>
                                <div className="input_block">
                                    <div className='input'>
                                        <label htmlFor="passwordConfirm">Confirm your password<span>*</span></label>
                                        <input
                                            className={errors.passwordConfirm ? 'error' : ''}
                                            type={passwordShown.passwordConfirm ? "text" : "password"}
                                            id='passwordConfirm'
                                            {...register("passwordConfirm", {required: true})}
                                        />
                                        <div className="show_hide" onClick={() => togglePassword("passwordConfirm")}>
                                            {passwordShown.passwordConfirm ? <VisibilityOff/> : <Visibility/>}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    name='Recover password'
                                    className='forget_btn'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={open}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success" sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={snackbarError}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error" sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default RecoverPassword;
