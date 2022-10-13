import React, {useEffect, useState} from 'react';
import LeftBlock from "../../Components/LeftBlock/LeftBlock";
import left_arrow from "../../Assets/left-arrow dark.png";
import logo from "../../Assets/login_logo.png";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import './ForgetPassword.scss';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearData, forgetPasswordAsync} from "./ForgetPasswordSlice";
import {useForm} from "react-hook-form";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const ForgetPassword = () => {
    const [open, setOpen] = useState(false);
    const [snackbarError, setSnackbarError] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const forgetPassword = useSelector((state) => state.forgetPassword);

    const handleClick = (data) => {
        dispatch(forgetPasswordAsync(data))
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSnackbarError(false)
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    })

    useEffect(() => {
        if (forgetPassword.status) {
            setMessage('Please check your email')
            setOpen(true);
            dispatch(clearData())
        }
        if (forgetPassword.error) {
            setMessage(forgetPassword.errorMessage)
            setSnackbarError(true);
            dispatch(clearData())
        }
    }, [forgetPassword])

    return (
        <div className='forget_password'>
            <Container>
                <LeftBlock/>
                <div className="right">
                    <div className="right_container">
                        <div className="log_in_btn">
                            <Link to="/login">
                                <img src={left_arrow} alt="left_arrow"/>
                            </Link>
                            <img src={logo} alt="logo" className='forget_pass_logo'/>
                        </div>
                        <div className="forget_inputs">
                            <form onSubmit={handleSubmit(handleClick)}>
                                <div className='input'>
                                    <label htmlFor="email"> Write your E-mail </label>
                                    <input
                                        className={errors.email ? 'error' : ''}
                                        type="text"
                                        id='email'
                                        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                                    />
                                </div>
                                <Button name='Recover password' className='forget_btn'/>
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

export default ForgetPassword;
