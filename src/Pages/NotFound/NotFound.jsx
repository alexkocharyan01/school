import React from 'react';
import Container from "../../Components/Container/Container";
import MainContainer from "../../Components/MainContainer/MainContainer";
import Button from "../../Components/Button/Button";
import './NotFound.scss'

const NotFound = () => {
    return (
        <div className="not_found">
            <Container>
                <MainContainer>
                    <div className="not_found_container">
                        <h2>404</h2>
                        <h3>Page not found!</h3>
                        <Button name='Get back' className='not_found_btn'/>
                    </div>
                </MainContainer>
            </Container>
        </div>
    );
};

export default NotFound;