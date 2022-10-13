import React, {useEffect} from 'react';
import "./ChatHome.scss";
import ChatList from "../../../Components/Message/ChatLIst/ChatList";
import {useDispatch, useSelector} from "react-redux";
import {messageAsync} from "../../../Components/Message/MessangerSlice";
import {useNavigate} from "react-router-dom";

function ChatHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const messange = useSelector(((state) => state.messange))

    const token = localStorage.getItem('ACCESS_TOKEN')
    let role

    if (localStorage.length !== 0) {
        role = window.localStorage.getItem('ROLE').toLowerCase()
    }

    useEffect(() => {
        dispatch(messageAsync(token))
    }, [])

    return (
        <div className="chat_home">
            <div className="chat_home_header">
                <h2 className="chat_home_title">Chats</h2>
                <div className="icon" onClick={() => navigate(`/${role}/chat`)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1H13V5" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 13H1V9" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.0002 1L8.3335 5.66667" stroke="#ffffff" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M1 12.9997L5.66667 8.33301" stroke="#ffffff" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="chat_home_scrollbar">
                <ChatList list={messange.data} searchValue=''/>
            </div>
        </div>
    )
}

export default ChatHome
