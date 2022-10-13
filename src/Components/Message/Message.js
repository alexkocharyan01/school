import React, {useEffect, useState} from 'react';
import ChatList from './ChatLIst/ChatList';
import ChatBox from './ChatBox/ChatBox';
import "./Message.scss";
import {useDispatch, useSelector} from "react-redux";
import {messageAsync} from "./MessangerSlice";

export default function Message({socket, socket2}) {
    const dispatch = useDispatch();
    const messange = useSelector(((state) => state.messange))
    const token = localStorage.getItem('ACCESS_TOKEN')
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        dispatch(messageAsync(token))
    }, [])

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <div>
            <div className="chat_input">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.33333 17.6667C13.9357 17.6667 17.6667 13.9357 17.6667 9.33333C17.6667 4.73096 13.9357 1 9.33333 1C4.73096 1 1 4.73096 1 9.33333C1 13.9357 4.73096 17.6667 9.33333 17.6667Z"
                        stroke="url(#paint0_linear_24_207)" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                    <path d="M19.75 19.75L15.2188 15.2188" stroke="url(#paint1_linear_24_207)" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                        <linearGradient id="paint0_linear_24_207" x1="9.33333" y1="1" x2="9.33333" y2="17.6667"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#78FAE9"/>
                            <stop offset="1" stopColor="#71C4FC"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_24_207" x1="17.4844" y1="15.2188" x2="17.4844" y2="19.75"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#78FAE9"/>
                            <stop offset="1" stopColor="#71C4FC"/>
                        </linearGradient>
                    </defs>
                </svg>
                <input type="text" placeholder="Search" onChange={handleSearch}/>
            </div>
            <div className="chat_container">
                <div className="chat_list">
                    <ChatList list={messange.data} searchValue={searchValue} socket={socket} socket2={socket2}/>
                </div>
                <div className="message_list">
                    <ChatBox socket={socket}/>
                </div>
            </div>
        </div>
    )
}
