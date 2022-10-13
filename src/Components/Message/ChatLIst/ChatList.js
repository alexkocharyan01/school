import React, {useEffect, useState} from 'react';
import "./ChatList.scss";
import {useDispatch, useSelector} from "react-redux";
import {getMessages, getReceiverId, getSenderImg, getSenderName} from "../MessangerSlice";

export default function ChatList({list, searchValue, socket, socket2}) {
    const [notification, setNotification] = useState(null)
    const [deleteNotification, setDeleteNotification] = useState(false)
    const [messageList, setMessageList] = useState([]);
    const [userData, setUserData] = useState(list);
    const [userId, setUserId] = useState([]);

    const dispatch = useDispatch();

    const message = useSelector(((state) => state.messange))
    const settings = useSelector(((state) => state.settings.data))

    const messages = (data) => {
        dispatch(getMessages(data))
    }

    const handleClick = (id, firstName, lastName, photo) => {
        setUserId(id)
        let name = firstName + ' ' + lastName
        dispatch(getReceiverId(id))
        dispatch(getSenderName(name))
        dispatch(getSenderImg(photo))
        socket.emit('joinRoom', id);
        socket.on('history', messages)
        socket.emit('readAllMessagesWith', id)
        if (id === notification) {
            setNotification(null)
        }
        list.map(person => {
            if (person.id === id) {
                setDeleteNotification(true)
            }
        })
        if (window.matchMedia("(max-width: 500px)").matches) {
            alert("inj vor ban")
        }
    }

    useEffect(() => {
        socket && socket.emit('joinRoom', list[0]);
        socket && socket.on('history', messages)
        if (list) {
            console.log(userId)
            let name = list[0]['firstName'] + ' ' + list[0]['lastName']
            setUserId(list[0]['id'])
            dispatch(getSenderName(name))
            dispatch(getSenderImg(list[0]['photo']))
        }
    }, [list])

    useEffect(() => {
        setMessageList(message.dataMessages)
    }, [message.dataMessages, list]);

    const message1 = messageList[0]

    const getNotification = (data) => {
        if (userData) {
            userData.map(person => {
                if (person.id === data.senderId) {
                    if (message.receiverId !== data.senderId) {
                        setNotification(data.senderId)

                        socket2.off('notification' + settings.id)
                    } else {
                        setNotification(false)
                        socket.emit('readAllMessagesWith', person.id)
                    }
                    socket2.on('notification' + settings.id, getNotification)
                }
            })
        }
    }

    socket2 && socket2.on('notification' + settings.id, getNotification)

    useEffect(() => {
        setUserData(list)
    }, [list])

    return (
        <div className="person_list">
            {userData && userData.filter(value => value.firstName.toLowerCase().includes(searchValue.toLowerCase())).map((person) => (
                <div key={person.id}
                     className={`persons_list_container ${message1 && person.id === message1['receiverId'] || person.id === userId ? 'active' : ''}`}
                     onClick={() => handleClick(person.id, person.firstName, person.lastName, person.photo)}>
                    <div className="about_person">
                        <div className="person_img">
                            <img src={`http://localhost:3000/images/${person.photo}`} alt='img'
                                 className={`${message1 && person.id === message1['receiverId'] || person.id === userId ? 'activeBorder' : ''}`}/>
                        </div>
                        <div className="person_text">
                            <h2>{person.firstName} {person.lastName}</h2>
                            {/*<p>{person.message}</p>*/}
                        </div>
                    </div>
                    <div className="chat_date">
                        {/*<h2>{person.date.h1}</h2>*/}
                        {/*{notification && person.id !== message.receiverId && person.newMessagesCount > 0  &&<div className="chat_count">*/}
                        {/*    <p>{person.newMessagesCount}</p>*/}
                        {/*</div>}*/}
                        {notification === person.id && person.id !== message.receiverId ?
                            <div className="chat_count"></div>
                            : person.newMessagesCount > 0 && !deleteNotification ?
                                <div className="chat_count"></div> : null
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}
