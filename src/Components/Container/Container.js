import React from 'react';
import './Container.scss'

const Container = (props) => {
    return (
        <div className={`container ${props.className}`}>
            <div className="container_block">
                {props.children}
            </div>
        </div>
    );
};

export default Container;