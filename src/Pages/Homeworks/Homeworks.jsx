import React from 'react';
import MainContainer from "../../Components/MainContainer/MainContainer";
import Nav from "../Nav/Nav";
import Header from "../../Components/Header/Header";
import Container from "../../Components/Container/Container";
import HomeworksSelect from "./HomeworksSelect/HomeworksSelect";
import "./Homeworks.scss";
import Letters from "./Letters/Letters";

function Homeworks() {
    return (
        <div className='homeworks'>
            <Container>
                <MainContainer>
                    <Nav/>
                    <div className="homeworks_page">
                        <Header name="Homeworks"/>
                        <div className="homeworks_container">
                            <HomeworksSelect/>
                            <Letters />
                        </div>
                    </div>
                </MainContainer>
            </Container>
        </div>
    );
}

export default Homeworks;
