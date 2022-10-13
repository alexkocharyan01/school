import React, {useCallback, useEffect, useState} from 'react';
import {Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import "./ModeratorTeacherTable.scss";
import {alpha, styled} from '@mui/material/styles';
import {blue} from '@mui/material/colors';
import {useDispatch, useSelector} from "react-redux";
import {moderatorAddMeeting, moderatorTeacherTable, phoneChangeAsync, teacherStatus} from '../ModeratorSlice';
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import ruLocale from 'date-fns/locale/ru';
import {getRoomNumber, getToken} from "../../Video/VideoSlice";
import {useNavigate} from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const columns = [
    {id: "firstname", label: "Firstname", minWidth: 50},
    {id: "lastname", label: "Lastname", minWidth: 50},
    {id: "email", label: "Email", minWidth: 100},
    {id: "phone", label: "Phone", minWidth: 250},
    {id: "gender", label: "Gender", minWidth: 50},
    {id: "status", label: "Status", minWidth: 50},
    {id: "students", label: "Students", minWidth: 10},
    {id: "rating", label: "Roting", minWidth: 10},
    {id: "setmeeting", label: "Set Messting", minWidth: 250},
];

const GreenSwitch = styled(Switch)(({theme}) => ({
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

const label = {inputProps: {'aria-label': 'Switch demo'}};

export default function ModeratorTeacherTable({show, searchValue}) {
    const [offset, setOffset] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [inputValue, setInputValue] = useState(false)
    const [changes, setChanges] = useState(false);
    const [phone, setPhone] = useState({});
    const [phoneChange, setPhoneChange] = useState(null)
    const [checked, setChecked] = useState();
    const [time, setTime] = useState({value: null, id: null});
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [show2, setShow2] = useState([]);

    const data = useSelector((state) => state.moderatorTeacher.userData);

    const dispatch = useDispatch();

    const token = localStorage.getItem('ACCESS_TOKEN');

    const navigate = useNavigate();

    const totalItemCouts = data.count


    const changeNumber = (event, id) => {
        event.preventDefault();
        setPhoneChange(id);
        setInputValue(!inputValue);
    }

    const handleSavePhoneNumber = (id) => {
        const values = {
            value: {
                phone: parseInt(phone),
                id: id,
            },
            token
        }
        setInputValue(!inputValue);
        setPhoneChange()
        setChanges(!changes);
        dispatch(phoneChangeAsync(values));
    }

    const handleChange = (active, id) => {
        const checkedStatus = {
                active: !active,
                id: id,
                token
        }
        setChecked(checkedStatus.active);
        dispatch(teacherStatus(checkedStatus));
    }

    const handleSetDate = (value, id) => {
        setTime({
            ...time,
            value,
            id
        })
    }

    const handleSetMeeting = (value, id) => {
        dispatch(moderatorAddMeeting({
            value: {
                meetingDate: value,
                userId: id,
            },
            token
        }))
    }

    const joinToClass = (roomNumber) => {
        const value = {
            token,
            roomNumber
        }
        dispatch(getRoomNumber(roomNumber))
        dispatch(getToken(value))
        navigate(`/moderator/video/${roomNumber}`)
    }

    const datesAreOnSameDay = (first, second) =>
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate() &&
        first.getHours() === second.getHours() &&
        first.getMinutes() <= second.getMinutes();

    const nextPage = useCallback(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset: rowsPerPage + offset,
            name: searchValue,
        }
        setOffset(rowsPerPage + offset)
        setPrev(false)
        dispatch(moderatorTeacherTable(value))
    })

    const prevPage = useCallback(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset: rowsPerPage - offset,
            name: searchValue,
        }
        setOffset(rowsPerPage - offset)
        setNext(false)
        dispatch(moderatorTeacherTable(value))
    })

    const limitChange = (event) => {
        setRowsPerPage(+event.target.value);
        const value = {
            token,
            limit: +event.target.value,
            offset,
            name: searchValue
        }
        dispatch(moderatorTeacherTable(value))
    };

    useEffect(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset,
            name: searchValue
        }
        dispatch(moderatorTeacherTable(value))
    }, [changes, checked, show, time, searchValue]);

    useEffect(() => {
        if (offset === 0) {
            setPrev(true)
        }
    }, [offset])

    useEffect(() => {
        if (totalItemCouts && offset >= Math.ceil(totalItemCouts / rowsPerPage)) {
            setNext(true)
        } else if (totalItemCouts === 0) {
            setNext(true)
        } else if (rowsPerPage > totalItemCouts || rowsPerPage === totalItemCouts) {
            setNext(true)
        } else {
            setNext(false)
        }
    })

    useEffect(
        () => {
            const timer = setInterval(() => {
                if (data.data) {
                    data.data
                        .map((row) => {
                            if (row.class) {
                                if ((row.class.status === 'INPROGRESS') || (row.class.status === 'READY') || (Math.abs((new Date(row.class.startDate).getTime() - +new Date()) <= 60 * 10000))) {
                                    setShow2([...show2, row.id])
                                }
                                if(new Date(row.class.startDate) < new Date()){
                                    clearInterval(timer);
                                }
                            }
                        })
                }
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        },
        [data]
    );

    return (
        <Paper sx={{width: "60"}}>
            <TableContainer sx={{maxHeight: 500}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{maxHeight: 20}}>
                            {columns.map((column) => (
                                <>
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            top: 50,
                                            minWidth: column.minWidth,
                                            maxHeight: 30,
                                            fontSize: 12,
                                            minHeight: column.minHeight
                                        }}
                                    >
                                        <div className="moderatorteachertable_label">
                                            <p>
                                                {column.label}
                                            </p>
                                        </div>
                                    </TableCell>
                                </>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data && data.data
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            if (column.id === "phone") {
                                                return (
                                                    <TableCell align={column.align} key={row.id}>
                                                        {
                                                            phoneChange === row.id
                                                                ? (
                                                                    <div className='moderatorteachertable_cangephon_number'>
                                                                        <input
                                                                            style={{border: 'solid 1.8px #9fb6d8'}}
                                                                            name='phone'
                                                                            type='number'
                                                                            onChange={(e) => setPhone(e.target.value)}
                                                                        />
                                                                        <button
                                                                            onClick={() => handleSavePhoneNumber(row.id)}>Save
                                                                        </button>
                                                                    </div>) : (
                                                                    <div className="moderatorteachertable_cangephon_number">
                                                                        <input
                                                                            disabled
                                                                            value={row.phone}/>
                                                                        <button
                                                                            onClick={(event) => changeNumber(event, row.id)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                 width="15" height="15" viewBox="0 0 16 16"
                                                                                 fill="none">
                                                                                <path
                                                                                    d="M11.3333 1.99955C11.5083 1.82445 11.7162 1.68556 11.945 1.5908C12.1738 1.49604 12.419 1.44727 12.6666 1.44727C12.9142 1.44727 13.1594 1.49604 13.3882 1.5908C13.617 1.68556 13.8248 1.82445 13.9999 1.99955C14.175 2.17465 14.3139 2.38252 14.4087 2.61129C14.5034 2.84006 14.5522 3.08526 14.5522 3.33288C14.5522 3.58051 14.5034 3.82571 14.4087 4.05448C14.3139 4.28325 14.175 4.49112 13.9999 4.66622L4.99992 13.6662L1.33325 14.6662L2.33325 10.9996L11.3333 1.99955Z"
                                                                                    stroke="#3398DF" strokeWidth="2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"/>
                                                                            </svg>
                                                                        </button>
                                                                    </div>)
                                                        }
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === "status") {
                                                return (
                                                    <TableCell>
                                                        <div className="moderatorteachertable_status">
                                                            <GreenSwitch
                                                                {...label}
                                                                checked={row.teacher.active}
                                                                onChange={() => handleChange(row.teacher.active, row.id)}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === "setmeeting") {
                                                return (
                                                    <TableCell>
                                                        <div className='set_meeting'>
                                                            <LocalizationProvider
                                                                dateAdapter={AdapterDateFns}
                                                                locale={ruLocale}
                                                            >
                                                                {row.class ?
                                                                    (row.class.status === 'INPROGRESS') || (row.class.status === 'READY') || (Math.abs((new Date(row.class.startDate).getTime() - +new Date()) <= 60 * 10000)) ?
                                                                        // datesAreOnSameDay(new Date(), new Date(row.class.startDate)) ?
                                                                        <button
                                                                            className='join_to_meeting'
                                                                            onClick={() => joinToClass(row.class.roomNumber)}>Join
                                                                            to meeting</button>
                                                                        : <DateTimePicker
                                                                            style={{wid: '30px'}}
                                                                            disabled
                                                                            renderInput={(props) =>
                                                                                <TextField {...props} />}
                                                                            value={new Date(row.class.startDate)}
                                                                        />
                                                                    :
                                                                    <DateTimePicker
                                                                        style={{wid: '30px'}}
                                                                        renderInput={(props) =>
                                                                            <TextField {...props} />}
                                                                        value={row.id === time.id ? time.value : null}
                                                                        onChange={(newValue) => handleSetDate(newValue, row.id)}
                                                                        onAccept={(newValue) => handleSetMeeting(newValue, row.id)}
                                                                    />
                                                                }
                                                            </LocalizationProvider>
                                                        </div>
                                                    </TableCell>
                                                )
                                            }
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <div className="moderatorteachertable_unader">
                                                        <p>
                                                            {column.format && typeof value === "number"
                                                                ? column.format(value)
                                                                : value}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='moderator_pagenation'>
                <select className='select' onChange={limitChange}>
                    <option defaultValue='5'>5</option>
                    <option defaultValue='10'>10</option>
                    <option defaultValue='15'>15</option>
                </select>
                <div>
                    <button className="prev" disabled={prev} onClick={() => prevPage()}><ArrowBackIosNewIcon/></button>
                    <button className="next" disabled={next} onClick={() => nextPage()}><ArrowForwardIosIcon/></button>
                </div>
            </div>
        </Paper>
    )
}
