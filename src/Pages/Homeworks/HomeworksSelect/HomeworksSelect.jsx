import React, {useEffect} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./HomeworksSelect.scss";
import {useDispatch, useSelector} from "react-redux";
import {connection} from "../../../Components/Connections/ConnectionsSlice";
import {ListSubheader} from "@mui/material";

const HomeworksSelect = () => {
    const [age, setAge] = React.useState(0);
    const [age2, setAge2] = React.useState(1);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChange2 = (event) => {
        setAge2(event.target.value);
    };

    const data = useSelector((state) => state.connection.data);
    const dispatch = useDispatch();
    const token = localStorage.getItem('ACCESS_TOKEN');

    const role = localStorage.getItem('ROLE');

    useEffect(() => {
        if (role === 'teacher') {
            dispatch(connection(token))
        }
    }, [])

    return (
        <div className='homeworks_select'>
            {role === 'teacher' && data.length > 0 && <div className="one">
                <p>Choose a student</p>
                <Select
                    value={age}
                    onChange={handleChange}
                    style={{background: 'rgba(228, 241, 250, 0.68)', borderRadius: 12, width: '100%'}}
                >
                    {data.map((item, index) => {
                        const person = item.userId
                        return (
                            <MenuItem value={index}>{person.firstName + ' ' + person.lastName}</MenuItem>
                        )
                    })}
                </Select>
            </div>
            }
            {role === 'teacher' && data.length > 0 && <div className="one">
                <p>Choose a theme</p>
                <Select
                    value={age2}
                    onChange={handleChange2}
                    style={{background: 'rgba(228, 241, 250, 0.68)', borderRadius: 12, width: '100%'}}
                >
                    <MenuItem value={1}>Letter teaching</MenuItem>
                    <MenuItem value={2} disabled={true}>Mathematics</MenuItem>
                </Select>
            </div>
            }
            {role === 'student' && <div className="one">
                <p>Choose a subject</p>
                <Select
                    value={age}
                    onChange={handleChange}
                    style={{background: 'rgba(228, 241, 250, 0.68)', borderRadius: 12, width: '100%'}}
                >
                    <MenuItem value={0}>Armenian</MenuItem>
                    <MenuItem value={2} disabled={true}>Mathematics</MenuItem>
                </Select>
            </div>
            }
            {role === 'student' && <div className="one">
                <p>Choose a theme</p>
                <Select
                    value={age2}
                    onChange={handleChange2}
                    style={{background: 'rgba(228, 241, 250, 0.68)', borderRadius: 12, width: '100%'}}
                >
                    <MenuItem value={1}>Letter teaching</MenuItem>
                </Select>
            </div>
            }
        </div>
    );
};

export default HomeworksSelect;
