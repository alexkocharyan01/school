import React from 'react';
import "./Chat.scss";
import Message from '../../Components/Message/Message';
import Container from "../../Components/Container/Container";
import MainContainer from "../../Components/MainContainer/MainContainer";
import Nav from "../Nav/Nav";
import Header from "../../Components/Header/Header";
import io from "socket.io-client";

function Chat() {

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
        <div className="chat">
            <Container>
                <MainContainer>
                    <Nav/>
                    <div className="chat_page">
                        <Header name="Chat"/>
                        <div className="message_container">
                            <Message socket={socket} socket2={socket2}/>
                        </div>
                    </div>
                </MainContainer>
            </Container>
        </div>
    )
}

export default Chat
