import React from 'react'
import NavSettings from '../NavSettings/NavSettings'
import "./Settings.scss";
import Container from "../../Components/Container/Container";
import MainContainer from "../../Components/MainContainer/MainContainer";
import Nav from "../Nav/Nav";

function Settings() {
  return (
    <div className="settings">
      <Container>
        <MainContainer>
          <Nav />
          <div className="settings_main">
            <div className="setings_header">
              <h2>Settings</h2>
            </div>
            <NavSettings />
          </div>
        </MainContainer>
      </Container>
    </div>
  )
}

export default Settings
