import React, {useState} from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

function CalendarContainer() {
    const [date, setDate] = useState(new Date());
    const [newDate, setNewDate] = useState();

    const onDateChange = (newDate) => {
        setNewDate(newDate)
    }

    return (
        <div>
            <Calendar
                onChange={onDateChange}
                value={date}
                showNeighboringMonth={false}
                locale={"hy-AM"}
            />
        </div>
    )
}

export default CalendarContainer;
