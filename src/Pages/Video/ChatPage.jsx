import React, {useEffect, useState} from 'react';
import ChatBox from "../../Components/Message/ChatBox/ChatBox";
import {getMessages, getReceiverId, getSenderImg, getSenderName} from "../../Components/Message/MessangerSlice";
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";

const ChatPage = () => {
    const [currentUser, setCurrentUser] = useState()
    const video = useSelector(((state) => state.video))
    const settings = useSelector(((state) => state.settings))

    const dispatch = useDispatch();

    const messages = (data) => {
        dispatch(getMessages(data))
    }

    useEffect(() => {
        if (video !== undefined) {
            if (video.getToken !== '') {
                if (Object.keys(settings.data).length !== 0) {
                    if (video.getToken.currentClass.participantId.id === settings.data.id) {
                        setCurrentUser(video.getToken.currentClass.creatorId)
                    } else {
                        setCurrentUser(video.getToken.currentClass.participantId)
                    }
                }
            }
        }
    }, [video, settings])

    useEffect(() => {
        if (currentUser) {
            socket.emit('joinRoom', currentUser.id);
            socket.on('history', messages)
            let name = currentUser.firstName + ' ' + currentUser.lastName
            dispatch(getSenderName(name))
            dispatch(getSenderImg(currentUser.photo))
            dispatch(getReceiverId(currentUser.id))
        }
    }, [currentUser])

    const token = localStorage.getItem('ACCESS_TOKEN')

    const socket = io("http://localhost:3000", {
        transportOptions: {
            polling: {
                extraHeaders: {"Authorization": 'Bearer ' + token}
            },
        },
    });

    return (
        <div className='chat_pages'>
            <ChatBox socket={socket}/>
        </div>
    );
}

export default ChatPage;
