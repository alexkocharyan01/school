import React from 'react';
import "./Button.scss";

const Button = ({name, className, onClick}) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {name}
        </button>
    );
};

export default Button;