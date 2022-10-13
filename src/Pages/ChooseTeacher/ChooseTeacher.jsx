import React, {useEffect, useState} from 'react';
import "./ChooseTeacher.scss";
import MorInfo from './MorInfo/MorInfo';
import Container from "../../Components/Container/Container";
import MainContainer from "../../Components/MainContainer/MainContainer";
import Nav from "../Nav/Nav";
import {useDispatch, useSelector} from "react-redux";
import {chooseTeacherAsync} from './ChooseTeacherSlice';
import Header from "../../Components/Header/Header";

export default function ChooseTeacher() {
    const [show, setShow] = useState(false);
    const [teacherPhoto, setTeacherPhoto] = useState();
    const [userId, setUserId] = useState();

    const data = useSelector((state) => state.chooseTeacher);
    const chooseTeacher = useSelector((state) => state.chooseTeacher.data);

    const token = localStorage.getItem('ACCESS_TOKEN');

    const dispatch = useDispatch();

    useEffect(() => {
        if (chooseTeacher && data.data.status === "success") {
            chooseTeacher.data.map((img) => {
                setTeacherPhoto(img.userId.photo);
            })
        }
    })

    const handleShow = (id) => {
        setShow(true)
        setUserId(id)
    }

    useEffect(() => {
        dispatch(chooseTeacherAsync(token))
    }, [])

    return (
        <div className="choose_teacher">
            <Container>
                <MainContainer>
                    <Nav/>
                    <div className="choose_teacher_container">
                        <Header name="Choose your teacher"/>
                        <div className="choose_teacher_component">
                            {chooseTeacher && chooseTeacher.map((teacherInfo, index) => (
                                <div key={teacherInfo.id} className="teacher_info">
                                    <div className="teacher_image">
                                        {teacherPhoto &&
                                            <img src={`http://localhost:3000/images/${teacherInfo.userId.photo}`}
                                                 alt="teacherPhoto"/>}
                                    </div>
                                    <div className="teacher_name">
                                        {teacherInfo.user &&
                                            <h2>{teacherInfo.user.firstname + " " + teacherInfo.user.lastname}</h2>
                                        }
                                    </div>
                                    <div className="see_mor_info">
                                        <button onClick={() => handleShow(teacherInfo.id)}><p>See More</p></button>
                                    </div>
                                    {
                                        userId && userId === teacherInfo.id ?
                                            <MorInfo key={index} show={show} setShow={setShow} info={teacherInfo.user}
                                                     techerInfoId={teacherInfo.id} teacherPhoto={teacherPhoto}/>
                                            : null
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </MainContainer>
            </Container>
        </div>
    )
}
