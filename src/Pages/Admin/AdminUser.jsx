import {Add} from '@mui/icons-material';
import React, {useState} from 'react';
import AdminDialog from './AdminDialog/AdminDialog';
import AdminNav from './AdminNav/AdminNav';
import './AdminUser.scss';
import ModeratorsTable from './ModeratorsTable/ModeratorsTable';

export default function AdminUser() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("")

    return (
        <div className="admin_user">
            <AdminNav/>
            <div className="admin_user_container">

                <div className="search_moderators">
                    <div className="admin_user_header">
                        <h2>Moderators</h2>
                    </div>
                    <div className="search_moderators_container">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.33333 17.6667C13.9357 17.6667 17.6667 13.9357 17.6667 9.33333C17.6667 4.73096 13.9357 1 9.33333 1C4.73096 1 1 4.73096 1 9.33333C1 13.9357 4.73096 17.6667 9.33333 17.6667Z"
                                stroke="url(#paint0_linear_24_207)" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                            <path d="M19.75 19.75L15.2188 15.2188" stroke="url(#paint1_linear_24_207)" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <defs>
                                <linearGradient id="paint0_linear_24_207" x1="9.33333" y1="1" x2="9.33333" y2="17.6667"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78FAE9"/>
                                    <stop offset="1" stopColor="#71C4FC"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_24_207" x1="17.4844" y1="15.2188" x2="17.4844"
                                                y2="19.75" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#78FAE9"/>
                                    <stop offset="1" stopColor="#71C4FC"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="input_div">
                            <input type="text" placeholder="Search moderators"
                                   onChange={(event) => setSearchValue(event.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="moderators_table">
                    <ModeratorsTable className="aa" show={show} searchValue={searchValue}/>
                    <div className="add_moderator">
                        <button
                            onClick={() => setShow(true)}
                        >
                            <Add/>
                        </button>
                        <p>Add Moderator</p>
                    </div>
                </div>
            </div>
            <AdminDialog show={show} setShow={setShow}/>
        </div>
    )
}
