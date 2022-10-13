import React from 'react';
import './ModeratorMessage.scss';
import ModeratorNav from '../ModeratorNav/ModeratorNav';
import Message from "../../../Components/Message/Message";
import io from "socket.io-client";

export default function ModeratorMessage() {
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
        <div className="moderator_message">
            <ModeratorNav/>
            <div className="moderator_message_container">
                <Message socket={socket} socket2={socket2}/>
            </div>
        </div>
    )
}
