import React, {useEffect, useState} from 'react';
import Container from "../../Components/Container/Container";
import LeftBlock from "../../Components/LeftBlock/LeftBlock";
import "./Login.scss";
import logo from "../../Assets/login_logo.png";
import left_arrow from "../../Assets/left-arrow dark.png";
import Button from "../../Components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAsync} from "./loginSlice";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const login = useSelector(((state) => state.login))
    const navigate = useNavigate();

    const handleChecked = (e) => {
        setChecked(e.target.checked)
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    const handleClick = (data) => {
        const values = {
            ...data,
            remember: checked
        }
        dispatch(loginAsync(values))
    }

    useEffect(() => {
        if (login.error) {
            setOpen(true);
        }
        if (login.data.token) {
            let decoded = jwt_decode(login.data.token.accessToken)
            console.log(decoded)
            window.localStorage.setItem('RTOKEN', login.data.refreshToken)
            window.localStorage.setItem('ACCESS_TOKEN', login.data.token.accessToken)
            window.localStorage.setItem('REMEMBER', login.data.data.updatedUser.remember)
            window.localStorage.setItem('ROLE', login.role)
            window.localStorage.setItem('EXPIRES', decoded.iat)
        }
        if (login.role && login.role === 'admin') {
            navigate(`/admin/users`)
        }

        if (login.role && login.role === 'moderator') {
            navigate(`/moderator/users`)
        }

        if (login.role && login.role === 'student' && login.data.data.updatedUser.student.needToChooseTeacher) {
            navigate(`/student/choose-teacher`)
        }
        if (login.role && login.role === 'student' && !login.data.data.updatedUser.student.needToChooseTeacher) {
            navigate(`/student/home`)
        }

        if (login.role && login.role === 'teacher') {
            navigate(`/teacher/home`)
        }
    }, [login.error, login.data, login.role])

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <div className='login'>
            <Container>
                <LeftBlock/>
                <div className="right">
                    <div className="right_container">
                        <div className="log_in_btn">
                            <Link to="/register-student">
                                <img src={left_arrow} alt="left_arrow"/>
                            </Link>
                            <img src={logo} alt="logo" className='login_logo'/>
                        </div>
                        <form onSubmit={handleSubmit(handleClick)}>
                            <div className="login_inputs">
                                <div className='input'>
                                    <label htmlFor="email"> Email </label>
                                    <input
                                        className={errors.email ? 'error' : ''}
                                        type="text"
                                        id='email'
                                        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                                    />
                                </div>
                                <div className='input'>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className={errors.password ? 'error' : ''}
                                        type={passwordShown ? "text" : "password"}
                                        id='password'
                                        {...register("password", {required: true})}
                                    />
                                    <div className="show_hide" onClick={togglePassword}>
                                        {passwordShown ? <VisibilityOff/> : <Visibility/>}
                                    </div>
                                </div>
                                <Button
                                    name='Log in'
                                    className='login_btn'
                                />
                                <div className="remember">
                                    <div>
                                        <input type="checkbox" id="remember" onChange={handleChecked}/>
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <Link to="/forget-password">Forgot password</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error" sx={{width: '100%'}}>
                        {login.errorMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    );
};

export default Login;
