import React, {useEffect, useState} from 'react';
import "./SoonLessons .scss";
import {classDate} from "../../../Components/BigCalendar/BigCalendarSlice";
import {useDispatch, useSelector} from "react-redux";

function SoonLessons() {
    const [count, setCount] = useState(3)

    const data = useSelector((state) => state.calendarLesson.data);

    const dispatch = useDispatch();

    const token = localStorage.getItem('ACCESS_TOKEN');

    const filtered = data && data.length > 0 && data.filter(word => word.status === 'UPCOMING' && !word.free && new Date(word.startDate) > new Date())

    const items = filtered && filtered.slice(0, count).map((item) => {
        return (
            <div key={item._id} className="person">
                <div className="person_name">
                    <div className="person_img">
                        <img src={`http://localhost:3000/images/${item.creatorId.photo}`} alt='img'/>
                    </div>
                    <div className="lesson_time">
                        <h3>{item.creatorId.firstName} {item.creatorId.lastName}</h3>
                        <p>{new Date(item.startDate).toLocaleString()}</p>
                    </div>
                </div>
                <div className="dots">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    })

    const handleSlice = () => {
        setCount(filtered.length)
    }

    useEffect(() => {
        dispatch(classDate(token))
    }, []);

    return (
        <div className="persons_lessons">
            <h2>Soon Lessons</h2>
            <div className={count <= 3 ? "person_container" : "person_container person_scroll"}>
                {items}
            </div>
            {filtered && filtered.length > 3 ? <button onClick={handleSlice}>+</button> : null}
        </div>
    )
}

export default SoonLessons;
