import React, {useState} from 'react';
import './Password.scss';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {formData} from "../../redux/inputSlice";

const Password = ({label_name, placeholder, id, name}) => {

    const [passwordShown, setPasswordShown] = useState(false);
    const dispatch = useDispatch();
    const login = useSelector(((state) => state.login))
    const register = useSelector(((state) => state.register))


    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const handleChange = (e) => {
        const text = e.target.value;
        const id = e.target.id;
        const name = e.target.name
        dispatch(formData({text, id, name}))
    }

    return (
        <div className='password'>
            <label htmlFor={id}>{label_name} {placeholder ? <span>*</span> : ''}</label>
            <input type={passwordShown ? "text" : "password"}
                   placeholder={placeholder}
                   id={id}
                   onChange={handleChange}
                   name={name}
                   className={login.error || register.error ? 'error' : ''}
            />
            <div className="show_hide" onClick={togglePassword}>
                {passwordShown ? <VisibilityOff/> : <Visibility/>}
            </div>
        </div>
    );
};

export default Password;