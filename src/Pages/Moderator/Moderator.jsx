import React, {useState} from 'react';
import ModeratorNav from './ModeratorNav/ModeratorNav';
import "./Moderator.scss"
import ModeratorTeacherTable from './ModeratorTeacherTable/ModeratorTeacherTable';
import ModeratorStudents from './ModeratorStudents/ModeratorStudents';
import {Add} from '@mui/icons-material';
import AddTeacher from './ModeratorTeacherTable/AddTeacher/AddTeacher';

export default function Moderator() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("")
    const [searchStudent, setSearchStudent] = useState("")

    return (
        <div className="moderator">
            <ModeratorNav/>
            <div className="moderator_container">
                <div className="moderator_teacher_container">

                    <div className="moderator_teacher_container_table">
                        <div className="search_moderators">
                            <h2>Teachers</h2>
                            <div className="search_moderators_container">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.33333 17.6667C13.9357 17.6667 17.6667 13.9357 17.6667 9.33333C17.6667 4.73096 13.9357 1 9.33333 1C4.73096 1 1 4.73096 1 9.33333C1 13.9357 4.73096 17.6667 9.33333 17.6667Z"
                                        stroke="url(#paint0_linear_24_207)" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                    <path d="M19.75 19.75L15.2188 15.2188" stroke="url(#paint1_linear_24_207)"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_24_207" x1="9.33333" y1="1" x2="9.33333"
                                                        y2="17.6667" gradientUnits="userSpaceOnUse">
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
                        <ModeratorTeacherTable show={show} searchValue={searchValue}/>
                        <div className="moderator_add_teacher">
                            <button onClick={() => setShow(true)}>
                                <Add/>
                            </button>
                            <p>Add Teacher</p>
                        </div>
                    </div>
                </div>
                <div className="moderator_students_container">
                    <div className="search_student">
                        <h2>Students</h2>
                        <div className="search_student_container">
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.33333 17.6667C13.9357 17.6667 17.6667 13.9357 17.6667 9.33333C17.6667 4.73096 13.9357 1 9.33333 1C4.73096 1 1 4.73096 1 9.33333C1 13.9357 4.73096 17.6667 9.33333 17.6667Z"
                                    stroke="url(#paint0_linear_24_207)" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path d="M19.75 19.75L15.2188 15.2188" stroke="url(#paint1_linear_24_207)"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <defs>
                                    <linearGradient id="paint0_linear_24_207" x1="9.33333" y1="1" x2="9.33333"
                                                    y2="17.6667" gradientUnits="userSpaceOnUse">
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
                                <input type="text" placeholder="Search student"
                                       onChange={(event) => setSearchStudent(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="moderator_students_container_table">
                        <ModeratorStudents searchStudent={searchStudent}/>
                    </div>
                </div>
            </div>
            <AddTeacher show={show} setShow={setShow}/>
        </div>
    )
}
