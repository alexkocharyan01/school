import React, { useEffect, useState } from 'react';
import "./Settings.scss";
import { useDispatch, useSelector } from "react-redux";
import { emailChangeAsync, nameChangeAsync, settingsAsync } from "../../Pages/Settings/SettingsSlice";
import PasswordContainer from './PasswordContainer';

export default function SettingsForAdminModerator() {

  const [changeName, setChangeName] = useState(false);
  const [fullName, setFullName] = useState({});
  const [email, setEmail] = useState('');

  const settings = useSelector(((state) => state.settings))
  
  const dispatch = useDispatch()
  
  const token = localStorage.getItem('ACCESS_TOKEN')

  const handleChange = (e) => {
    const re = /^[A-Za-z]+$/;
    if (re.test(e.target.value) || e.target.id === 'phone') {
      setFullName({
        ...fullName,
        [e.target.id]: e.target.value,
      });
    }
  }

  const handleSaveChangedName = () => {
    console.log(fullName);
    const values = {
      name: {
        firstname: fullName.firstname,
        lastname: fullName.lastname,
        phone: parseInt(fullName.phone)

      },
      token
    }
    dispatch(nameChangeAsync(values))
  }

  const handleSave = () => {
    const newValue = {
        newEmail: email,
        token
    }
    dispatch(emailChangeAsync(newValue))
  }

  const handleKeyPressData = (event) => {
    if (event.key === 'Enter') {
      handleSaveChangedName();
    }
  }

  const handleKeyPressSaveEmail = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  }

  useEffect(() => {
    dispatch(settingsAsync(token))
  }, [changeName])

  useEffect(() => {
    if(settings.data.newEmail){
      setEmail(settings.data.newEmail)
    } else{
      setEmail(settings.data.email)
    }
    setFullName({firstname: settings.data.firstname, lastname: settings.data.lastname, phone: settings.data.phone})
  }, [settings.data])


  return (
    <div className="setings">
      <h2>Settings</h2>
      <div className="settings_container">
       
        <div className="updata_container">
        
          <div className="updata_container_password">
            <div className="first_name">
              <label htmlFor="firstname">First Name<span>*</span></label>
              <input
                type="text"
                id="firstname" 
                value={fullName.firstname ? fullName.firstname : ""}
                onKeyPress={handleKeyPressData}
                onChange={handleChange}
              />
            </div>
            <div className="last_name">
              <label htmlFor="lastname">Last Name<span>*</span></label>
              <input
                type="text"
                id="lastname"
                value={fullName.lastname ? fullName.lastname : ""}
                onKeyPress={handleKeyPressData}
                onChange={handleChange}
              />
            </div>
            <div className="phone_number">
              <label htmlFor="phone">Phone Number<span>*</span></label>
              <input
              type="number"
                id="phone"
                value={fullName.phone ? fullName.phone : ""}
                onKeyPress={handleKeyPressData}
                onChange={handleChange}
              />
            </div>
            <button onClick={() => handleSaveChangedName()}><p>Update Date</p></button>
          </div>
          <div className="updata_container_password">
          <div className="currend_email_container">
            <h3>Current Email</h3>
            {settings.data.newEmail ?
            (<p>{settings.data.newEmail}</p>) : ( <p>{settings.data.email}</p>)  
          }
            <label htmlFor="newEmail">New Email</label>
            <input
              id="newEmail" 
              value={email ? email : ""}
              type="email"

              onKeyPress={handleKeyPressSaveEmail}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button onClick={() => handleSave()}><p>Update Email</p></button>
        </div>
          <div className="updata_container_password">
            <PasswordContainer/>
          </div>
        </div>
      </div >
    </div >
  )
}
