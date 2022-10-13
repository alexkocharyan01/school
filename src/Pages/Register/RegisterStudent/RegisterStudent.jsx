import React, {useEffect, useState} from 'react';
import Button from "../../../Components/Button/Button";
import './RegisterStudent.scss';
import Container from "../../../Components/Container/Container";
import LeftBlock from "../../../Components/LeftBlock/LeftBlock";
import logo from '../../../Assets/login_logo.png'
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {clearData, registerAsync} from "./registerStudentSlice";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useForm} from "react-hook-form";

const RegisterStudent = () => {
    const [passwordShown, setPasswordShown] = useState({
        "password": false,
        "passwordConfirm": false,
    });
    const [open, setOpen] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loginValue = useSelector(((state) => state.register))

    const handleLogin = () => {
        navigate("/login");
    }

    const togglePassword = (id) => {
        setPasswordShown({
            ...passwordShown,
            [id]: !passwordShown[id]
        });
    }

    const handleClick = (value) => {
        const arr = Object.entries(value)
        const filtered = arr.filter(([key]) => key !== 'password' && key !== 'passwordConfirm')
        const newObj = Object.fromEntries(filtered)
        const values = {
            ...newObj,
            passwords: {password: value.password, passwordConfirm: value.passwordConfirm}
        }
        dispatch(registerAsync(value))
    }

    useEffect(() => {
        if (loginValue.error) {
            setOpen(true);
        }
    }, [loginValue.error])

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    useEffect(() => {
        if (loginValue.status) {
            navigate("/register-mail-sent");
            setTimeout(() => {
                dispatch(clearData())
            }, 3000)
        }
    })

    return (
        <div className="register_student">
            <Container>
                <LeftBlock/>
                <div className="right">
                    <div className="right_container">
                        <div className="log_in_btn">
                            <img src={logo} alt="logo"/>
                            <Button onClick={handleLogin} name='Log in' className='log_in'/>
                        </div>
                        <h3>Student or Parent</h3>
                        <form onSubmit={handleSubmit(handleClick)}>

                            <div className="flex_input">
                                <div className="input_block">
                                    <div className='input'>
                                        <label htmlFor="firstName">First Name<span>*</span></label>
                                        <input
                                            className={errors.firstName ? 'error' : ''}
                                            type="text"
                                            placeholder='Enter your first name'
                                            id="firstName"
                                            {...register("firstname", {required: true})}
                                        />
                                    </div>
                                </div>
                                <div className="input_block">
                                    <div className='input'>
                                        <label htmlFor="lastName">Last Name<span>*</span></label>
                                        <input
                                            className={errors.lastName ? 'error' : ''}
                                            type="text"
                                            placeholder='Enter your last name'
                                            id="lastName"
                                            {...register("lastname", {required: true})}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex_input">
                                <div className="input_block">
                                    <div className='input'>
                                        <label htmlFor="email">Email<span>*</span></label>
                                        <input
                                            className={errors.email ? 'error' : ''}
                                            type="email"
                                            placeholder='Enter your email address'
                                            id="email"
                                            {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                                        />
                                    </div>
                                </div>
                                <div className="input_block">
                                    <div className='input'>
                                        <label htmlFor="phone">Phone<span>*</span></label>
                                        <input
                                            className={errors.phone ? 'error' : ''}
                                            type="number"
                                            placeholder='Enter your phone number name'
                                            id="phone"
                                            {...register("phone", {required: true, valueAsNumber: true,})}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex_input">
                                <div className="input_block">
                                    <div className='radio'>
                                        <p>Gender<span>*</span></p>
                                        <div className="radio_flex">
                                            <div className={errors.gender ? 'radio_block error' : 'radio_block'}>
                                                <label htmlFor='male'>male</label>
                                                <input
                                                    type="radio"
                                                    id='male'
                                                    name='gender'
                                                    value="male"
                                                    {...register("gender", {required: true})}/>
                                            </div>
                                            <div className={errors.gender ? 'radio_block error' : 'radio_block'}>
                                                <label htmlFor='female'>female</label>
                                                <input
                                                    type="radio"
                                                    id='female'
                                                    name='gender'
                                                    value="female"
                                                    {...register("gender", {required: true})}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="input_block">
                                    <div className='radio'>
                                        <p>Target group<span>*</span></p>
                                        <div className="radio_flex">
                                            <div className={errors.group ? 'radio_block error' : 'radio_block'}>
                                                <label htmlFor='child'>child</label>
                                                <input
                                                    type="radio"
                                                    id='child'
                                                    name='group'
                                                    value="child"
                                                    {...register("group", {required: true})}/>
                                            </div>
                                            <div className={errors.group ? 'radio_block error' : 'radio_block'}>
                                                <label htmlFor='teen'>teen</label>
                                                <input
                                                    type="radio"
                                                    id='teen'
                                                    value="teen"
                                                    name='group'
                                                    {...register("group", {required: true})}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex_input">
                                <div className="input_block">
                                    <div className='input'>
                                        <label htmlFor="password">Password<span>*</span></label>
                                        <input
                                            className={errors.password ? 'error' : ''}
                                            type={passwordShown.password ? "text" : "password"}
                                            id='password'
                                            placeholder='Enter password'
                                            {...register("password", {required: true})}
                                        />
                                        <div className="show_hide" onClick={() => togglePassword('password')}>
                                            {passwordShown.password ? <VisibilityOff/> : <Visibility/>}
                                        </div>
                                    </div>
                                </div>
                                <div className="input_block">
                                    <div className='input'>
                                        <label htmlFor="passwordConfirm">Confirm password<span>*</span></label>
                                        <input
                                            className={errors.passwordConfirm ? 'error' : ''}
                                            type={passwordShown.passwordConfirm ? "text" : "password"}
                                            id='passwordConfirm'
                                            placeholder='Confirm password'
                                            {...register("passwordConfirm", {required: true})}
                                        />
                                        <div className="show_hide" onClick={() => togglePassword('passwordConfirm')}>
                                            {passwordShown.passwordConfirm ? <VisibilityOff/> : <Visibility/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="register_button">
                                <Button name='Register' className='register_btn'/>
                            </div>
                        </form>
                        <div className="request">
                            <Link to="/register-teacher">Leave a request</Link>
                            <span>to become a teacher</span>
                        </div>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error" sx={{width: '100%'}}>
                        {loginValue.errorMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    );
};

export default RegisterStudent;
