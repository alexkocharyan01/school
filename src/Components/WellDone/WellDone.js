import React from 'react';
import './WellDone.scss'
import Container from '../Container/Container';
import MainContainer from "../MainContainer/MainContainer";
import Button from "../Button/Button";
import logo from "../../Assets/tick.png";
import {useNavigate} from "react-router-dom";

const WellDone = ({text, done = 'Well done!'}) => {

    const navigate = useNavigate();

    return (
        <div className="well_done">
            <Container>
                <MainContainer>
                    <div className="well_done_container">
                        <img src={logo} alt="logo"/>
                        <h3>{done}</h3>
                        <h4>{text}</h4>
                        <Button name='Go back' className='well_done_btn' onClick={() => navigate("/")}/>
                    </div>
                </MainContainer>
            </Container>
        </div>
    );
};

export default WellDone;
