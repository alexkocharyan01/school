import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import "./MorInfo.scss";
import {useDispatch, useSelector} from "react-redux";
import {chooseTeacher} from '../ChooseTeacherSlice';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function MorInfo({show, setShow, info, teacherPhoto, techerInfoId}) {

    const token = localStorage.getItem('ACCESS_TOKEN');

    const data = useSelector((state) => state.chooseTeacher);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const chooseTeacherClick = () => {
        const value = {
            teacherId: techerInfoId,
            token,
        }
        dispatch(chooseTeacher(value));
    }

    useEffect(() => {
        if (data.teacherDataStatus) {
            navigate(`/student/home`)
        }
    }, [data.teacherData, data.teacherDataStatus])

    return (
        <div className="morinfo">
            <Dialog
                open={show}
                BackdropProps={{style: {backgroundColor: 'gba(246, 246, 246, 0.04)', backdropFilter: 'blur(4px)'}}}
            >
                <div className='aa'>
                    <DialogTitle id="alert-dialog-slide-title">
                        <div className="close_button">
                            <button onClick={() => setShow(false)}>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 26L8 14L20 2" stroke="#3398DF" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </DialogTitle>
                    <DialogContent className='teacher_more_info'>
                        <div className="show_info_container">
                            <div className="teacher_header">
                                <div className="teacher_image">
                                    <img src={`http://localhost:3000/images/${info.photo}`} alt="logo"/>
                                </div>
                                <div className='info'>
                                    <div className="teacher_name">
                                        <p>{info.firstname + " " + info.lastname}</p>
                                    </div>
                                    <div className="choose_techer_date">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                                                stroke="#3398DF" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round"/>
                                            <path d="M16 2V6" stroke="#3398DF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M8 2V6" stroke="#3398DF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M3 10H21" stroke="#3398DF" strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                        <div className="lesson_time">
                                            <p className="time_for_lesson">11:00 - 18:00</p>
                                            <p className="working_days">Sun - Wen</p>
                                        </div>
                                    </div>
                                    <div className="choose_me">
                                        <button onClick={() => chooseTeacherClick(info.id)}><p>Chose Me</p></button>
                                    </div>
                                </div>
                            </div>
                            <div className="about_teacher">
                                <p>{info.firstName + " " + info.lastName + " "}
                                    Lorem Ipsum is simply dummy text of
                                    the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard
                                    dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and
                                    scrambled it to make a type specimen book.
                                    It has survived not only five centuries,
                                    but also the leap into electronic
                                    typesetting, remaining essentially unchanged.
                                    It was popularised in the 1960s with the release
                                    of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    )
}
