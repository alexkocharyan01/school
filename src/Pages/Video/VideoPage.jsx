import React, {useEffect, useState} from 'react';
import './Video.scss';
import {useDispatch, useSelector} from "react-redux";
import {endCall, getToken} from "./VideoSlice";
import Video from 'twilio-video';
import Participant from "./Participant";
import LocalParticipant from "./LocalParticipant";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";

const VideoPage  = () => {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
    const [shareEnabled, setShareEnabled] = useState(true);
    const [screenTrack, setScreenTrack] = useState();
    const [oldCamera, setOldCamera] = useState();
    const [videoTracks, setVideoTracks] = useState([]);

    const dispatch = useDispatch();
    const video = useSelector(((state) => state.video))
    const token = localStorage.getItem('ACCESS_TOKEN')
    const {roomNumber} = useParams();
    const navigate = useNavigate();

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant={participant}/>
    ));

    const disableCamera = () => {
        if (room) {
            room.localParticipant.videoTracks.forEach((publication) => {
                publication.track.disable();
                setCameraEnabled(false);
            });
        }
    }

    const enableCamera = () => {
        if (room) {
            room.localParticipant.videoTracks.forEach((publication) => {
                publication.track.enable();
                setCameraEnabled(true);
            });
        }
    }

    const enableMicrophone = () => {
        if (room) {
            room.localParticipant.audioTracks.forEach((publication) => {
                publication.track.enable();
            });
            setMicrophoneEnabled(true)
        }
    }
    const disableMicrophone = () => {
        if (room) {
            room.localParticipant.audioTracks.forEach((publication) => {
                publication.track.disable();
            });
            setMicrophoneEnabled(false)
        }
    }

    const shareScreen = async () => {
        try {
            if (!screenTrack) {
                setOldCamera(videoTracks[0])
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true
                });
                const newScreenTrack = stream.getVideoTracks()[0];
                setScreenTrack(new Video.LocalVideoTrack(newScreenTrack));
                const newVideoTrack = new Video.LocalVideoTrack(newScreenTrack)
                await room.localParticipant.unpublishTrack(videoTracks[0]);
                await room.localParticipant.publishTrack(newVideoTrack);
                setShareEnabled(false)
            } else {
                await room.localParticipant.unpublishTrack(screenTrack);
                await room.localParticipant.publishTrack(oldCamera);
                screenTrack.stop();
                setScreenTrack(null)
                setShareEnabled(true)
            }
        } catch (error) {
            screenTrack.stop();
            setScreenTrack(null)
            setShareEnabled(true)
        }
    };

    const endCalls = () => {
        const value = {
            token,
            roomNumber
        }
        dispatch(endCall(value))
        navigate('/')

    }

    useEffect(() => {
        const value = {
            token,
            roomNumber
        }
        dispatch(getToken(value))
    }, [])

    useEffect(() => {
        Video.connect(video.getToken.token, {
            name: roomNumber,
            logLevel: 'debug',
            tracks: undefined,
            audio: true,
            maxAudioBitrate: 16000, // For music remove this line
            video: {height: 720, frameRate: 24, width: 1280}
        }).then(room => {
            setRoom(room);
            console.log(room);
        });
    }, [video.getToken.token])

    useEffect(() => {
        if (room) {
            const participantConnected = (participant) => {
                setParticipants((prevParticipants) => [...prevParticipants, participant]);
            };

            const participantDisconnected = (participant) => {
                setParticipants((prevParticipants) =>
                    prevParticipants.filter((p) => p !== participant)
                );
            };

            room.on("participantConnected", participantConnected);
            room.on("participantDisconnected", participantDisconnected);
            room.participants.forEach(participantConnected);
            return () => {
                room.off("participantConnected", participantConnected);
                room.off("participantDisconnected", participantDisconnected);
            };
        }
    }, [room]);

    return (
        <div className="video_page">
            <div className="local_participant">
                {room ? (
                    <LocalParticipant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                        videoTracks={videoTracks}
                        setVideoTracks={setVideoTracks}
                    />
                ) : (
                    ""
                )}
            </div>
            <div className="remote_participants">{remoteParticipants}</div>
            <div className="video_buttons">
                <div className="video_btn">
                    {cameraEnabled ?
                        <div className="video_icon" onClick={disableCamera}>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.5418 10.2085L23.3335 17.5002L33.5418 24.7918V10.2085Z" stroke="white"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M20.4168 7.2915H4.37516C2.76433 7.2915 1.4585 8.59734 1.4585 10.2082V24.7915C1.4585 26.4023 2.76433 27.7082 4.37516 27.7082H20.4168C22.0277 27.7082 23.3335 26.4023 23.3335 24.7915V10.2082C23.3335 8.59734 22.0277 7.2915 20.4168 7.2915Z"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        :
                        <div className="video_icon disable_icon" onClick={enableCamera}>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.5418 10.2085L23.3335 17.5002L33.5418 24.7918V10.2085Z" stroke="white"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M20.4168 7.2915H4.37516C2.76433 7.2915 1.4585 8.59734 1.4585 10.2082V24.7915C1.4585 26.4023 2.76433 27.7082 4.37516 27.7082H20.4168C22.0277 27.7082 23.3335 26.4023 23.3335 24.7915V10.2082C23.3335 8.59734 22.0277 7.2915 20.4168 7.2915Z"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    }
                </div>
                <div className="video_btn">
                    {microphoneEnabled ?
                        <div className="video_icon" onClick={disableMicrophone}>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.5 1.4585C16.3397 1.4585 15.2269 1.91943 14.4064 2.7399C13.5859 3.56038 13.125 4.67317 13.125 5.8335V17.5002C13.125 18.6605 13.5859 19.7733 14.4064 20.5938C15.2269 21.4142 16.3397 21.8752 17.5 21.8752C18.6603 21.8752 19.7731 21.4142 20.5936 20.5938C21.4141 19.7733 21.875 18.6605 21.875 17.5002V5.8335C21.875 4.67317 21.4141 3.56038 20.5936 2.7399C19.7731 1.91943 18.6603 1.4585 17.5 1.4585V1.4585Z"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M27.7082 14.5835V17.5002C27.7082 20.2076 26.6327 22.8041 24.7182 24.7185C22.8038 26.633 20.2073 27.7085 17.4998 27.7085C14.7924 27.7085 12.1959 26.633 10.2815 24.7185C8.36702 22.8041 7.2915 20.2076 7.2915 17.5002V14.5835"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.5 27.7085V33.5418" stroke="white" strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M11.6665 33.5415H23.3332" stroke="white" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        :
                        <div className="video_icon disable_icon" onClick={enableMicrophone}>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.5 1.4585C16.3397 1.4585 15.2269 1.91943 14.4064 2.7399C13.5859 3.56038 13.125 4.67317 13.125 5.8335V17.5002C13.125 18.6605 13.5859 19.7733 14.4064 20.5938C15.2269 21.4142 16.3397 21.8752 17.5 21.8752C18.6603 21.8752 19.7731 21.4142 20.5936 20.5938C21.4141 19.7733 21.875 18.6605 21.875 17.5002V5.8335C21.875 4.67317 21.4141 3.56038 20.5936 2.7399C19.7731 1.91943 18.6603 1.4585 17.5 1.4585V1.4585Z"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path
                                    d="M27.7082 14.5835V17.5002C27.7082 20.2076 26.6327 22.8041 24.7182 24.7185C22.8038 26.633 20.2073 27.7085 17.4998 27.7085C14.7924 27.7085 12.1959 26.633 10.2815 24.7185C8.36702 22.8041 7.2915 20.2076 7.2915 17.5002V14.5835"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.5 27.7085V33.5418" stroke="white" strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M11.6665 33.5415H23.3332" stroke="white" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    }
                </div>
                <div className="video_btn">
                    {shareEnabled ?
                        <div className="video_icon" onClick={shareScreen}>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.2915 24.7917H5.83317C5.05962 24.7917 4.31776 24.4844 3.77078 23.9374C3.22379 23.3904 2.9165 22.6485 2.9165 21.875V7.29167C2.9165 6.51812 3.22379 5.77625 3.77078 5.22927C4.31776 4.68229 5.05962 4.375 5.83317 4.375H29.1665C29.9401 4.375 30.6819 4.68229 31.2289 5.22927C31.7759 5.77625 32.0832 6.51812 32.0832 7.29167V21.875C32.0832 22.6485 31.7759 23.3904 31.2289 23.9374C30.6819 24.4844 29.9401 24.7917 29.1665 24.7917H27.7082"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.5002 21.875L24.7918 30.625H10.2085L17.5002 21.875Z" stroke="white"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        :
                        <div className="video_icon share_screen" onClick={shareScreen}>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.2915 24.7917H5.83317C5.05962 24.7917 4.31776 24.4844 3.77078 23.9374C3.22379 23.3904 2.9165 22.6485 2.9165 21.875V7.29167C2.9165 6.51812 3.22379 5.77625 3.77078 5.22927C4.31776 4.68229 5.05962 4.375 5.83317 4.375H29.1665C29.9401 4.375 30.6819 4.68229 31.2289 5.22927C31.7759 5.77625 32.0832 6.51812 32.0832 7.29167V21.875C32.0832 22.6485 31.7759 23.3904 31.2289 23.9374C30.6819 24.4844 29.9401 24.7917 29.1665 24.7917H27.7082"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.5002 21.875L24.7918 30.625H10.2085L17.5002 21.875Z" stroke="white"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    }
                </div>
                <div className="video_btn">
                    <div className="video_icon end_call" onClick={endCalls}>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M33.5415 1.4585L24.7915 10.2085" stroke="white" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M24.7915 1.4585L33.5415 10.2085" stroke="white" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M32.0831 24.675V29.05C32.0847 29.4561 32.0016 29.8581 31.8388 30.2303C31.6761 30.6024 31.4375 30.9365 31.1382 31.211C30.8389 31.4856 30.4856 31.6946 30.1009 31.8248C29.7161 31.9549 29.3084 32.0032 28.9039 31.9666C24.4164 31.479 20.1058 29.9456 16.3185 27.4896C12.7949 25.2505 9.80754 22.2631 7.56851 18.7396C5.1039 14.9351 3.57011 10.6035 3.09143 6.09581C3.05498 5.69253 3.10291 5.28609 3.23216 4.90235C3.3614 4.51861 3.56913 4.16598 3.84213 3.86693C4.11512 3.56787 4.44739 3.32893 4.81779 3.16532C5.18819 3.00172 5.58859 2.91703 5.99351 2.91665H10.3685C11.0762 2.90968 11.7624 3.1603 12.299 3.6218C12.8356 4.08329 13.1861 4.72417 13.2852 5.42498C13.4698 6.82507 13.8123 8.19979 14.306 9.52289C14.5022 10.0449 14.5447 10.6121 14.4284 11.1575C14.3121 11.7029 14.0419 12.2035 13.6498 12.6L11.7977 14.4521C13.8737 18.1031 16.8967 21.126 20.5477 23.2021L22.3998 21.35C22.7963 20.9579 23.2969 20.6877 23.8422 20.5714C24.3876 20.4551 24.9549 20.4975 25.4768 20.6937C26.8 21.1874 28.1747 21.5299 29.5748 21.7146C30.2832 21.8145 30.9301 22.1713 31.3926 22.7172C31.8551 23.263 32.1008 23.9598 32.0831 24.675Z"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;
