import React from "react";
import "./Home.scss";
import ChatHome from "./ChatHome/ChatHome";
import CallsHistory from "./CallsHistory/CallsHistory";
import Time from "./TIme/Time";
import Container from "../../Components/Container/Container";
import MainContainer from "../../Components/MainContainer/MainContainer";
import Nav from "../Nav/Nav";
import Header from "../../Components/Header/Header";
import CalendarContainer from "../../Components/Calendar/Calendar";
import SoonLessons from "./SoonLessons/SoonLessons ";

function Home() {
    return (
        <div className="home">
            <Container>
                <MainContainer>
                    <Nav/>
                    <div className="home_main">
                        <Header name="Home"/>
                        <div className="home_components">
                            <div className="home_container">
                                <div className="first_coponent">
                                    <div className="calendar">
                                        <CalendarContainer/>
                                    </div>
                                    <div className="coming_lessons">
                                        <SoonLessons/>
                                    </div>
                                </div>
                                <div className="second_coponent">
                                    <ChatHome/>
                                </div>
                                <div className="threeth_coponent">
                                    <Time/>
                                    <div className="calls_history">
                                        <CallsHistory/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContainer>
            </Container>
        </div>
    );
}

export default Home;
