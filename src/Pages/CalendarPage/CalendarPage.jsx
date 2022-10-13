import React from 'react'
import BigCalendar from '../../Components/BigCalendar/BigCalendar'
import CalendarContainer from '../../Components/Calendar/Calendar'
import Connections from '../../Components/Connections/Connections'
import Container from '../../Components/Container/Container'
import MainContainer from '../../Components/MainContainer/MainContainer'
import Nav from '../Nav/Nav'
import './CalendarPage.scss'
import Header from "../../Components/Header/Header";

function CalendarPage() {

    const role = localStorage.getItem("ROLE")

    return (
        <div className='calendarPage'>
            <Container>
                <MainContainer>
                    <Nav/>
                    <div className='calendarPage_container'>
                        <Header name="Calendar"/>
                        <div className='calendar_cont'>
                            <div className='small_calendar'>
                                <div className='calendar'>
                                    <CalendarContainer/>
                                </div>
                                {
                                    role === "teacher" &&
                                    <div className='connections'>
                                        <Connections/>
                                    </div>
                                }
                            </div>
                            <div className='big_calendar'>
                                <BigCalendar/>
                            </div>
                        </div>
                    </div>
                </MainContainer>
            </Container>
        </div>
    )
}

export default CalendarPage
