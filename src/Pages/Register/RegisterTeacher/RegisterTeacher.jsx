import React, {useEffect, useState} from 'react';
import LeftBlock from "../../../Components/LeftBlock/LeftBlock";
import logo from "../../../Assets/login_logo.png";
import Button from "../../../Components/Button/Button";
import Container from "../../../Components/Container/Container";
import {Link, useNavigate} from "react-router-dom";
import './RegisterTeacher.scss';
import left_arrow from "../../../Assets/left-arrow dark.png";
import icon from "../../../Assets/register.png";
import {useDispatch, useSelector} from "react-redux";
import {registerTeacherAsync, clearData} from "./registerTeacherSlice";
import {useForm} from "react-hook-form";

const RegisterTeacher = () => {
    const [fileName, setFileName] = useState()
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const {register, handleSubmit, formState: {errors}, watch, resetField} = useForm();
    
    const file = watch("file");

    const registerTeacher = useSelector(((state) => state.registerTeacher))
    
    const handleRemove = () => {
        setFileName(null)
        resetField('file')
    }

    const handleClick = (data) => {
        const formData = new FormData();
        formData.append('cv', data.file[0]);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        dispatch(registerTeacherAsync(formData))
    }

    useEffect(() => {
        if (file) {
            if (file.length > 0) {
                setFileName(file[0].name)
            }
        }
    }, [file]);

    useEffect(() => {
        if (registerTeacher.data.status === 'success') {
            navigate("/teacher-register-done");
            setTimeout(() => {
                dispatch(clearData())
            }, 3000)
        }
    })

    return (
        <div className="register_teacher">
            <Container>
                <LeftBlock/>
                <div className="right">
                    <div className="right_container">
                        <div className="log_in_btn">
                            <Link to="/register-student">
                                <img src={left_arrow} alt="left_arrow"/>
                            </Link>
                            <img src={logo} alt="logo" className='logo_img'/>
                        </div>
                        <h3>Leave a request</h3>
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
                                            {...register("firstName", {required: true})}
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
                                            {...register("lastName", {required: true})}
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
                                            {...register("phone", {required: true})}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="input_file">
                                <label htmlFor="form">CV<span>*</span></label>
                                <div className={`form ${errors.file ? 'error' : ''}`}>
                                    <input
                                        id="form"
                                        type="file"
                                        accept="application/pdf"
                                        {...register("file", {required: true})}
                                    />
                                    <div className="drag">
                                        <img src={icon} alt=""/>
                                        <p>Drag your files here or click in this area.</p>
                                    </div>
                                    {fileName && <span className="fileNames"><span>{fileName}</span><b
                                        onClick={handleRemove}>&#10005;</b></span>}
                                </div>
                            </div>
                            <div className="register_button">
                                <Button name='Submit' className='register_btn'/>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default RegisterTeacher;
