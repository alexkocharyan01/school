import React, {useEffect, useState} from 'react';
import './Connections.scss';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {connection} from "./ConnectionsSlice";

export default function Connections() {
    const data = useSelector((state) => state.connection.data);
    const dispatch = useDispatch();
    const token = localStorage.getItem('ACCESS_TOKEN');

    const role = localStorage.getItem('ROLE');

    useEffect(() => {
        if(role === 'teacher'){
            dispatch(connection(token))
        }
    }, [])

    return (
        <div>
            {data.length > 0 ? (
                <div className='connection_scroll'>
                    {data.map((item) => {
                        const person = item.userId
                        return (
                            <div key={person.id} className="connection_container">
                                <img src={`http://localhost:3000/images/${person.photo}`} alt='img'
                                     className='connection_img'/>
                                <p className='connection_name'>{person.firstName + ' ' + person.lastName}</p>
                            </div>
                        )
                    })}
                </div>
            ) : (<div>Loading</div>)}
        </div>
    )
}
