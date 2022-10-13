import React from 'react';
import "./ModeratorNav.scss";
import {NavLink, useNavigate} from 'react-router-dom';
import {DateRange, Login, MessageOutlined, NotificationsNone, PersonOutline, Settings} from '@mui/icons-material';
import {useDispatch} from "react-redux";
import {clearData, logoutAsync} from "../../Login/loginSlice";

export default function ModeratorNav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('ACCESS_TOKEN')

    const logOut = () => {
        localStorage.clear();
        dispatch(clearData())
        dispatch(logoutAsync(token))
        navigate(`/login`)
    }

    return (
        <div className="moderator_nav">
            <ul className="moderator_nav_up">
                <li>
                    <NavLink to="/moderator/users" className='moderator_icons'>
                        <PersonOutline/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/moderator/message" className='moderator_icons'>
                        <MessageOutlined/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/moderator/calendar" className='moderator_icons'>
                        <DateRange/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/moderator/notification" className='moderator_icons'>
                        <NotificationsNone/>
                    </NavLink>
                </li>
            </ul>
            <ul className="moderator_nav_down">
                <li>
                    <NavLink to="/moderator/setting" className='moderator_icons'>
                        <Settings/>
                    </NavLink>
                </li>
                <li>
                    <div className="log_out" onClick={() => logOut()}>
                        <Login/>
                    </div>
                </li>
            </ul>
        </div>
    )
}
