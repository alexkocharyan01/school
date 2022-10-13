import React from 'react';
import './OneLetter.scss'
import MainContainer from "../../../Components/MainContainer/MainContainer";
import Nav from "../../Nav/Nav";
import Container from "../../../Components/Container/Container";
import {ReactSketchCanvas} from "react-sketch-canvas";
import img from "../../../Assets/aa.png";
import SwipeToSlide from "../Slider/Slider";
import Slider from "../Slider/Slider";

const OneLetter = () => {
    const styles = {
        border: 'none',
    };
    return (
        <div className='one_letter'>
            <Container>
                <MainContainer>
                    <Nav/>
                    <div className="one_letter_page">
                        <div className="letter_header">
                            <h2>Letter teaching</h2>
                        </div>
                        <div className="one_letter_container">
                            <div className="top_block">
                                <div className="letter">
                                    <p>Աա</p>
                                </div>
                                <Slider/>
                            </div>
                            <div className="bottom_block">
                                <div className="letter">
                                    <p>Աա</p>
                                </div>
                                <ReactSketchCanvas
                                    style={styles}
                                    width="70%"
                                    height="26.3vh"
                                    strokeWidth={10}
                                    strokeColor="white"
                                    backgroundImage={img}
                                />
                            </div>
                        </div>
                    </div>
                </MainContainer>
            </Container>
        </div>
    );
};

export default OneLetter;
