import React from 'react';
import './MainContainer.scss'

const MainContainer = (props) => {
    return (
        <div className="main_container">
           {props.children}
        </div>
    );
};

export default MainContainer;