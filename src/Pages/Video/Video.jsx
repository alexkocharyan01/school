import React from 'react';
import './Video.scss';
import VideoPage from "./VideoPage";
import ChatPage from "./ChatPage";

const VideoChat = () => {

    return (
        <div className='video'>
            <VideoPage />
            <ChatPage />
        </div>
    );
}

export default VideoChat;
