import React, {useEffect, useRef, useState} from 'react';
import "./ChatBox.scss";
import {useDispatch, useSelector} from "react-redux";
import {settingsAsync} from "../../../Pages/Settings/SettingsSlice";
// import socket from "../../../socket/socket";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

function ChatBox({socket}) {
    const [messageList, setMessageList] = useState([]);
    const [value, setValue] = useState('');
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState()
    let [newMessages, setNewMessages] = useState(20)

    const messages = useSelector(((state) => state.messange))
    const user = useSelector(((state) => state.settings))

    const dispatch = useDispatch();

    const token = localStorage.getItem('ACCESS_TOKEN')

    const messagesEndRef = useRef(null);
    const messagesEnd = useRef(null);
    const loadNew = useRef(null);
    const observer = useRef();

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            send();
        }
    };

    const chooseFile = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const handleRemoveFile = () => {
        setFileName(null)
    }

    const scrollToBottom = () => {
        if (newMessages > 24 && messageList.length > 10 && messageList.length>newMessages) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    };

    const scrollToEnd = () => {
        messagesEnd.current.scrollIntoView({behavior: "smooth"});
    };

    const send = async () => {
        if (value) {
            const messageData = {
                receiverId: messages.receiverId,
                senderId: user.data.id,
                message: value
            };
            await socket.emit('send message', messageData)
        }
        if (file) {
            const messageFile = {
                receiverId: messages.receiverId,
                senderId: user.data.id,
                fileName: fileName.split('.')[0],
                fileExt: fileName.split('.').pop(),
                file: file
            };
            await socket.emit('send message', messageFile)
            setFile(null)
            setFileName(null)
        }
        setValue("");
    };

    useEffect(() => {
        dispatch(settingsAsync(token))
    }, [])

    useEffect(() => {
        socket && socket.on("getMessage", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    useEffect(() => {
        setMessageList(messages.dataMessages)
    }, [messages.dataMessages]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        let cb = function (entries) {
            if (entries[0].isIntersecting) {
                newMessages = newMessages + 10
                setNewMessages(newMessages)
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(loadNew.current)
    }, [])

    useEffect(scrollToBottom, [messageList, newMessages]);

    useEffect(scrollToEnd, [messageList]);

    return (
        <div className="chat_box">
            <div className="message_people_info">
                <h2>{messages.senderName}</h2>
                <svg width="29" height="19" viewBox="0 0 29 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.5833 3.41602L19.125 9.45768L27.5833 15.4993V3.41602Z"
                          stroke="url(#paint0_linear_26_11)" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path
                        d="M16.7083 1H3.41667C2.08198 1 1 2.08198 1 3.41667V15.5C1 16.8347 2.08198 17.9167 3.41667 17.9167H16.7083C18.043 17.9167 19.125 16.8347 19.125 15.5V3.41667C19.125 2.08198 18.043 1 16.7083 1Z"
                        stroke="url(#paint1_linear_26_11)" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                    <defs>
                        <linearGradient id="paint0_linear_26_11" x1="23.3542" y1="3.41602" x2="23.3542" y2="15.4993"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#78FAE9"/>
                            <stop offset="1" stopColor="#71C4FC"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_26_11" x1="10.0625" y1="1" x2="10.0625" y2="17.9167"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#78FAE9"/>
                            <stop offset="1" stopColor="#71C4FC"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="message_box">
                <div className="messages_component">
                    <div ref={loadNew}/>
                    {messageList.length > 0 && messageList.slice(-newMessages, messageList.length).map((item, index) => {
                        return (
                            item.senderId !== user.data.id ?
                                item.hasFile ?
                                    <div key={item._id} className="coming_messages_container"
                                         ref={index === 10 ? messagesEndRef : null}>
                                        <div className="comming_person_img">
                                            <img src={`http://localhost:3000/images/${messages.senderImg}`} alt='logo'/>
                                        </div>
                                        <div className='messages_block'>
                                            {
                                                item.fileName.split('.').pop() === 'jpg' || item.fileName.split('.').pop() === 'png' || item.fileName.split('.').pop() === 'jpeg' ?
                                                    <div className="coming_messages bbb">

                                                        <a href={`http://localhost:3000/messages/${item.fileName}`}
                                                           download
                                                           target='_blank'><img
                                                            src={`http://localhost:3000/messages/${item.fileName}`}
                                                            alt=""/>
                                                        </a>
                                                    </div>
                                                    :
                                                    <div className="coming_messages">
                                                        <ArticleOutlinedIcon className='comm_mes_fileIcon'/>

                                                        <a href={`http://localhost:3000/messages/${item.fileName}`}
                                                           download
                                                           target='_blank'>
                                                            {item.fileName.slice(0, 10) + "..." + item.fileName.slice(-7, item.fileName.length)}
                                                        </a>
                                                    </div>
                                            }
                                            <p>
                                                {new Date(item.sendDate).getHours().toLocaleString()}
                                                :
                                                {new Date(item.sendDate).getMinutes().toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    <div key={item._id} className="coming_messages_container"
                                         ref={index === 10 ? messagesEndRef : null}>
                                        <div className="comming_person_img">
                                            <img src={`http://localhost:3000/images/${messages.senderImg}`} alt='logo'/>
                                        </div>
                                        <div className='messages_block'>
                                            <div className="coming_messages">
                                                <span>{item.message}</span>
                                            </div>
                                            <p>
                                                {new Date(item.sendDate).getHours().toLocaleString()}
                                                :
                                                {new Date(item.sendDate).getMinutes().toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                :
                                item.hasFile ?
                                    <div id={index} key={item._id} className="writhed_messages_container"
                                         ref={index === 10 ? messagesEndRef : null}>
                                        {
                                            item.fileName.split('.').pop() === 'jpg' || item.fileName.split('.').pop() === 'png' || item.fileName.split('.').pop() === 'jpeg' ?
                                                <div className="writhed_message bbb">
                                                    <a href={`http://localhost:3000/messages/${item.fileName}`} download
                                                       target='_blank'><img
                                                        src={`http://localhost:3000/messages/${item.fileName}`}
                                                        alt=""/>
                                                    </a>
                                                </div>
                                                :
                                                <div className="writhed_message">
                                                    <ArticleOutlinedIcon className='writ_mes_fileIcon'/>

                                                    <a href={`http://localhost:3000/messages/${item.fileName}`} download
                                                       target='_blank'>
                                                        {item.fileName.slice(0, 10) + "..." + item.fileName.slice(-7, item.fileName.length)}
                                                    </a>
                                                </div>
                                        }
                                        <p>
                                            {new Date(item.sendDate).getHours().toLocaleString()}
                                            :
                                            {new Date(item.sendDate).getMinutes().toLocaleString()}
                                        </p>
                                    </div>
                                    :
                                    <div id={index} key={index} className="writhed_messages_container"
                                         ref={index === 10 ? messagesEndRef : null}>
                                        <div className="writhed_message">
                                            <span>{item.message}</span>
                                        </div>
                                        <p>
                                            {new Date(item.sendDate).getHours().toLocaleString()}
                                            :
                                            {new Date(item.sendDate).getMinutes().toLocaleString()}
                                        </p>
                                    </div>
                        )
                    })}

                    <div ref={messagesEnd}/>
                </div>
                <div className="writhe_message_component">
                    <div className="input_component">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
                                stroke="#3398DF" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M7.6001 14.2002C7.6001 14.2002 9.2501 16.4002 12.0001 16.4002C14.7501 16.4002 16.4001 14.2002 16.4001 14.2002"
                                stroke="#3398DF" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.69995 8.7002H8.71095" stroke="#3398DF" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M15.3 8.7002H15.311" stroke="#3398DF" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <textarea
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            value={value} placeholder="Type a message..."
                        />
                    </div>
                    {fileName && <span className="fileNames"><span>{fileName}</span><b
                        onClick={handleRemoveFile}>&#10005;</b></span>
                    }
                    <div className="send_component">
                        <div className="choose_file">
                            <label htmlFor="file">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14 7.0944L7.8539 12.8909C7.10095 13.6011 6.07974 14 5.01492 14C3.9501 14 2.92889 13.6011 2.17594 12.8909C1.423 12.1808 1 11.2177 1 10.2134C1 9.20917 1.423 8.24604 2.17594 7.53592L8.32204 1.73937C8.82401 1.26596 9.50481 1 10.2147 1C10.9246 1 11.6054 1.26596 12.1073 1.73937C12.6093 2.21279 12.8913 2.85487 12.8913 3.52438C12.8913 4.19389 12.6093 4.83598 12.1073 5.30939L5.95456 11.1059C5.70358 11.3426 5.36317 11.4756 5.00823 11.4756C4.65329 11.4756 4.31289 11.3426 4.06191 11.1059C3.81093 10.8692 3.66993 10.5482 3.66993 10.2134C3.66993 9.87867 3.81093 9.55763 4.06191 9.32092L9.73986 3.97221"
                                        stroke="#3398DF" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </label>
                            <input id="file" type="file" onChange={chooseFile}/>
                        </div>
                        <div className="send_button" onClick={send}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 1L7.30005 8.7" stroke="white" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M15 1L10.1 15L7.3 8.7L1 5.9L15 1Z" stroke="white" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox
