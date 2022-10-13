import React from 'react';
import './Radio.scss'
import {useDispatch, useSelector} from "react-redux";
import {formData} from "../../redux/inputSlice";

const Radio = ({radios_name, radio_name1, radio_name2, name}) => {
    const dispatch = useDispatch();

    const register = useSelector(((state) => state.register))

    const handleChange = (e) => {
        const val = e.target.id;
        const id = e.target.name;
        let text
        if (val == 'male' || val == "female") {
            text = val.toUpperCase()
        } else {
            text = val
        }
        dispatch(formData({text, id}))
    }
    return (
        <div className='radio'>
            <p>{radios_name}<span>*</span></p>
            <div className="radio_flex">
                <div className="radio_block">
                    <label htmlFor={radio_name1}>{radio_name1}</label>
                    <input type="radio" id={radio_name1} name={name} onChange={handleChange}/>
                </div>
                <div className="radio_block">
                    <label htmlFor={radio_name2}>{radio_name2}</label>
                    <input type="radio" id={radio_name2} name={name} onChange={handleChange}/>
                </div>
            </div>
        </div>
    );
};

export default Radio;