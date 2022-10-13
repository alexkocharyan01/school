import React, {useEffect, useState} from 'react';
import "./Time.scss";
import {useDispatch, useSelector} from "react-redux";
import {getRoomNumber, getToken} from "../../Video/VideoSlice";
import {useNavigate} from "react-router-dom";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Time() {
    const [dateState, setDateState] = useState(new Date());
    // const [roomNumber, setRoomNumber] = useState('');
    let roomNumber;
    let startDate;
    // const [canJoinToClass, setCanJoinToClass] = useState(false);
    let canJoinToClass = false

    const data = useSelector((state) => state.calendarLesson.data);

    const dispatch = useDispatch();

    const token = localStorage.getItem('ACCESS_TOKEN');

    const navigate = useNavigate();
    const [show2, setShow2] = useState([]);

    // const filtered = data && data.forEach(item => {
    //     if ((item.status === 'INPROGRESS') || (item.status === 'READY') || ((Math.abs((new Date(data.startDate).getTime() - (new Date()).getTime()))) <= 10 * 60000) && item.status === 'UPCOMING') {
    //         console.log(item)
    //         canJoinToClass = true
    //         roomNumber = item.roomNumber
    //         startDate = item.startDate
    //     }
    // })


    const joinToClass = () => {
        let  roomNumber = show2[0].roomNumber
        const value = {
            token,
            roomNumber
        }
        dispatch(getRoomNumber(roomNumber))
        dispatch(getToken(value))
        navigate(`/moderator/video/${roomNumber}`)
    }

    useEffect(() => {
        const date = setInterval(() => setDateState(new Date()), 30000);
        return () => {
            clearInterval(date);
        };
    }, []);

    useEffect(
        () => {
            const timer = setInterval(() => {
                data.length > 0 && data.forEach(item => {
                    if ((item.status === 'INPROGRESS') || (item.status === 'READY') || ((Math.abs((new Date(data.startDate).getTime() - (new Date()).getTime()))) <= 10 * 60000) && item.status === 'UPCOMING') {
                        console.log(item)
                        canJoinToClass = true
                        setShow2([...show2, {time:item.startDate, roomNumber:item.roomNumber}])
                        roomNumber = item.roomNumber
                        startDate = item.startDate
                    }
                })
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        },
        [data]
    );

    return (
        <div className="time">
            {show2.length> 0
                ?
                <div className='join_to_class'>
                    <div className="first">
                        <p>Join to lesson</p>
                        <div className="icon">
                            <div className="back-circle"></div>
                            <div className="button"></div>
                            {/*<div className="front-circle"></div>*/}
                            <LocalPhoneIcon onClick={joinToClass}/>
                        </div>
                    </div>
                    <p>Start time: {new Date(show2[0].time).getHours()} : {new Date(show2[0].time).getMinutes()}</p>
                </div>
                :
                <>
                    <div className="date">
                        <h2>
                            {dateState.toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </h2>
                    </div>
                    <div className="day">
                        <p>{dateState.toLocaleDateString()}</p>
                    </div>
                </>
            }
        </div>
    )
}

export default Time
