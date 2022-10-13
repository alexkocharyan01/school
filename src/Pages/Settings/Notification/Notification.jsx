import React, { useEffect, useState } from 'react';
import "./Notification.scss";
import { alpha, styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Switch } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { settingsAsync } from "../SettingsSlice";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: blue[600],
    '&:hover': {
      backgroundColor: alpha(blue[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: blue[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Notification() {
  const [checked, setChecked] = useState(false);

  const settings = useSelector(((state) => state.settings.data.emailNotification))
  const dispatch = useDispatch();

  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem('ACCESS_TOKEN')
  const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
  }

  const handleChange = () => {
    axios.patch(`${apiUrl}/user/email-notification`, { emailNotification: !checked }, {
      headers: headers
    })
    setChecked(!checked);
  }

  useEffect(() => {
    dispatch(settingsAsync(token))
    setChecked(settings)
  }, [settings])


  return (
    <div className="notification">
      <div className="notification_label">
        <p className="email_otification">Email Notification:</p>
        <div className="notification_label_container">
          <p>Disable</p>
          <GreenSwitch
            {...label}
            checked={checked}
            onChange={handleChange} />
          <p>Enable</p>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Notification
