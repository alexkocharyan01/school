import React from 'react';
import './Inputs.scss'
import {useDispatch, useSelector} from "react-redux";
import {formData} from "../../redux/inputSlice";

const Inputs = ({type, label_name, placeholder, id}) => {
    const login = useSelector(((state) => state.login))
    const register = useSelector(((state) => state.register))

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const text = e.target.value;
        const id = e.target.id;
        dispatch(formData({text, id}))
    }

    return (
        <div className='inputs'>
            <label htmlFor={id}>{label_name} {placeholder ? <span>*</span> : ''}</label>
            <input type={type}
                   placeholder={placeholder}
                   id={id}
                   onChange={handleChange}
                   className={login.error || register.error ? 'error' : ''}
            />
        </div>
    );
};

export default Inputs;