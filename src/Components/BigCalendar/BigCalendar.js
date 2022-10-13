import React, {useEffect, useState} from 'react';
import './BigCalendar.scss';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {useDispatch, useSelector} from "react-redux";
import {classDate, classDatePost, studentClassDatePost, classDelete, clearData} from "./BigCalendarSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function BigCalendar() {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [event, setEvent] = useState([]);
    const [lessonTime, setLessonTime] = useState(false);
    const [open, setOpen] = useState(false);
    const [openDeleteClass, setOpenDeleteClass] = useState(false);

    const data = useSelector((state) => state.calendarLesson);

    const dispatch = useDispatch();

    const token = localStorage.getItem('ACCESS_TOKEN');
    const role = localStorage.getItem('ROLE');

    const handleEvents = (events) => {
        setCurrentEvents(events)
    }
    const setLesson = (info) => {
        const day = new Date().getDate()
        const startday = new Date(info.dateStr).getDate()
        const time = new Date().getHours()
        const startTime = new Date(info.dateStr).getHours()
        const startDate = info.dateStr

        if (startday > day || (startday === day && startTime > time)) {
            if(role === 'teacher'){
                const values = {
                    startDate: startDate,
                }
                dispatch(classDatePost(values))
                setEvent((prevState) => ([...prevState, {start: values.startDate}]));
                dispatch(clearData())
            }
        }
        setLessonTime(!lessonTime)
    }

    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
                {eventInfo.event.extendedProps.photo &&
                <img className='event_image' src={eventInfo.event.extendedProps.photo}/>
                }
            </>
        )
    }

    const handleMonthChange = (info) => {
        if(role === 'student'){
            const value = {
                classId: info.event.id,
                token,
            }
            dispatch(studentClassDatePost(value))
        }
        if(role === 'teacher'){
            const value  ={
                id: info.event.id,
                token,
            }
            dispatch(classDelete(value))
        }
        setLessonTime(!lessonTime)
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleCloseDeleteClass = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDeleteClass(false);
    };

    useEffect(() => {
        dispatch(classDate(token))
    }, [lessonTime]);

    useEffect(() => {
        if (data.data && data.data.length > 0) {
            setEvent([])
            data.data.map((item) => {
                    if(role === 'student'){
                        if(item.participantId){
                            setEvent((prevState) => ([...prevState, {
                                start: item.startDate,
                                title: item.creatorId.firstName + ' ' + item.creatorId.lastName,
                                photo: `http://localhost:3000/images/${item.creatorId.photo}`,
                                id: item._id
                            }]));
                        } else {
                            setEvent((prevState) => ([...prevState, {
                                start: item.startDate,
                                id: item._id
                            }]));
                        }
                    } else if(role === 'teacher'){
                        if(item.participantId){
                            setEvent((prevState) => ([...prevState, {
                            start: item.startDate,
                            title: item.participantId.firstName + ' ' + item.participantId.lastName,
                            photo: `http://localhost:3000/images/${item.participantId.photo}`,
                            id: item._id
                        }]));
                        } else {
                            setEvent((prevState) => ([...prevState, {
                                start: item.startDate,
                                id: item._id
                            }]));
                        }
                    }
            })
        }
    }, [data, lessonTime])

    useEffect(() => {
        if(role === 'teacher'){
            if(data.error){
                setOpen(true);
            }
            if(data.deleteStatus === "success"){
                setOpenDeleteClass(true)
                setTimeout(() => {
                    setOpenDeleteClass(false)
                    dispatch(clearData())
                }, 3000)
            }
        }
    }, [data, lessonTime])

    return (
        <div className='demo_app'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
                initialView='timeGridWeek'
                events={event}
                selectable={false}
                dateClick={setLesson}
                slotDuration='01:00'
                allDaySlot={false}
                eventContent={renderEventContent}
                eventsSet={handleEvents}
                eventColor='rgba(0, 0, 0, 0.4)'
                eventClick={handleMonthChange}
            />
             <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error" sx={{width: '100%'}}>
                        {data.errorMessage}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                    open={openDeleteClass}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert
                        onClose={handleCloseDeleteClass}
                        severity="success" sx={{width: '100%'}}>
                        <p>Class was delete</p>
                    </Alert>
                </Snackbar>
        </div>
    )
}

export default BigCalendar
