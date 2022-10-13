import {ChatBubbleOutline, Login, PersonOutline, Settings} from '@mui/icons-material';
import React from 'react';
import './AdminNav.scss';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {clearData, logoutAsync} from "../../Login/loginSlice";

export default function AdminNav() {
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
        <div className="admin_nav">
            <div className="nav_up">
                <ul className="nav_up_menu">
                    <li>
                        <NavLink to="/admin/users" className="admin">
                            <PersonOutline/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/chat" className="admin">
                            <ChatBubbleOutline/>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="nav_down">
                <ul className="nav_down_menu">
                    <li>
                        <NavLink to="/admin/setting" className="admin">
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
        </div>
    )
}
