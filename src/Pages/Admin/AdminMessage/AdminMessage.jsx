import React from 'react';
import Message from '../../../Components/Message/Message';
import AdminNav from '../AdminNav/AdminNav';
import "./AdminMessage.scss"
import io from "socket.io-client";

export default function AdminMessage() {
    const token = localStorage.getItem('ACCESS_TOKEN')

    const socket = io("http://localhost:3000", {
        transportOptions: {
            polling: {
                extraHeaders: {"Authorization": 'Bearer ' + token}
            },
        },
    });

    const socket2 = io("http://localhost:3000/messenger", {
        transportOptions: {
            polling: {
                extraHeaders: {"Authorization": 'Bearer ' + token}
            },
        },
    });

    return (
        <div className="admin_message">
            <AdminNav/>
            <div className="admin_message_container">
                <div className="admin_message_component">
                    <Message socket={socket} socket2={socket2}/>
                </div>
            </div>
        </div>
    )
}
