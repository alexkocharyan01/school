import React, {useEffect, useState, useCallback} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import "./ModeratorStudents.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    moderatorStudentLeavelChange,
    moderatorStudentLevels,
    moderatorStudentTable,
    teacherDelete
} from './ModeratorStudentSlice';
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {moderatorAddMeeting, phoneChangeAsync} from '../ModeratorSlice';
import ruLocale from "date-fns/locale/ru";
import {getToken} from "../../Video/VideoSlice";
import {useNavigate} from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const columns = [
    {id: "firstname", label: "Firstname", minWidth: 100},
    {id: "lastname", label: "Lastname", minWidth: 100},
    {id: "email", label: "Email", minWidth: 100},
    {id: "phone", label: "Phone", minWidth: 100},
    {id: "gender", label: "Gender", minWidth: 60},
    {id: "group", label: "Group", minWidth: 60,},
    {id: "teacher", label: "Teacher", minWidth: 30},
    {id: "level", label: "Level", minWidth: 30},
    {id: "setmeeting", label: "Set Messting", minWidth: 60},
];

export default function ModeratorStudents({searchStudent}) {

    const [offset, setOffset] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [time, setTime] = useState(new Date());
    const [phone, setPhone] = useState({});
    const [studentLeavelChange, setStudentLeavelChange] = useState();
    const [phoneChange, setPhoneChange] = useState(null);
    const [deleteTeacher, setDeleteTeacher] = useState(false);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    const data = useSelector((state) => state.moderatorStudent.data);
    const levels = useSelector((state) => state.moderatorStudent.levels);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const token = localStorage.getItem('ACCESS_TOKEN');

    const totalItemCouts = data.count

    const changePhoneNumber = (event, id) => {
        event.preventDefault();
        setPhoneChange(id);
    }

    const savePhoneNumber = (id) => {
            
        const values = {
            value: {
                phone: parseInt(phone),
                id: id,
            },
            token
        }
        setPhoneChange()
        dispatch(phoneChangeAsync(values))
    }

    const changeLeavel = (level, id) => {
        const checkedStatus = {
            value: {
                level: level,
                studentId: id,
            },
            token,
        }
        setStudentLeavelChange(checkedStatus)
        dispatch(moderatorStudentLeavelChange(checkedStatus))
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
            value:{
                meetingDate: value,
            userId: id
            },
            token
        }))
      }

    const handleDelete = (studentId) => {
        const value = {
            studentId,
            token
        }
        setDeleteTeacher(!deleteTeacher)
        dispatch(teacherDelete(value))
    }

    const joinToClass = (roomNumber) => {
        const value = {
            token,
            roomNumber
        }
        dispatch(getToken(value))
        navigate(`/moderator/video/${roomNumber}`)
    }

    // const datesAreOnSameDay = (first, second) =>
    //     first.getMonth() === second.getMonth() &&
    //     first.getDate() === second.getDate() &&
    //     first.getHours() === second.getHours() &&
    //     first.getMinutes() <= second.getMinutes();

    const nextPage = useCallback(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset: rowsPerPage + offset,
            name: searchStudent,
        }
        setOffset(rowsPerPage + offset)
        setPrev(false)
        dispatch(moderatorStudentTable(value))
    })
    
    const prevPage = useCallback(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset: rowsPerPage - offset,
            name: searchStudent,
        }
        setOffset(rowsPerPage - offset)
        dispatch(moderatorStudentTable(value))
    })
      
    const limitChange = (event) => {
      setRowsPerPage(+event.target.value);
      setOffset(0);
      const value = {
        token, 
        limit: +event.target.value,
        offset,
        name: searchStudent
      }
      dispatch(moderatorStudentTable(value))
    };

    useEffect(() => {
        const value = {
            token, 
            limit: rowsPerPage,
            offset: offset,
            name: searchStudent
          }
        dispatch(moderatorStudentTable(value));
    }, [phoneChange, studentLeavelChange, deleteTeacher, searchStudent])

    useEffect(() => {
        dispatch(moderatorStudentLevels(token))
    }, [studentLeavelChange])

    useEffect(() => {
        if(offset === 0){
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

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{maxHeight: 30}}>
                            {columns.map((column) => (
                                <>
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{top: 57, minWidth: column.minWidth, maxHeight: 30, fontSize: 12}}
                                    >
                                        <div className="moderatorstudentstable_label">
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
                                                    <TableCell align={column.align} key={column.id}>
                                                        {
                                                            phoneChange === row.id ?
                                                                (<div
                                                                    className='moderatorstudentstable_cangephon_number'>
                                                                    <input
                                                                        style={{border: 'solid 1.8px #9fb6d8'}}
                                                                        name='phone'
                                                                        type='number'
                                                                        onChange={(e) => setPhone(e.target.value)}
                                                                    />
                                                                    <button
                                                                        onClick={() => savePhoneNumber(row.id)}>Save
                                                                    </button>
                                                                </div>)
                                                                :
                                                                (<div
                                                                    className='moderatorstudentstable_cangephon_number'>
                                                                    <input value={row.phone}/>
                                                                    <button
                                                                        onClick={(event) => changePhoneNumber(event, row.id)}>
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
                                            if (column.id === "teacher") {
                                                return (
                                                    <TableCell key={column.id}>
                                                        {
                                                            row.teacher ?
                                                                (
                                                                    <div className='delete_teacher'>
                                                                        <p>{row.teacher.firstname}</p>
                                                                        <button className='delete_icon' onClick={() => handleDelete(row.id)}><DeleteOutline/></button>
                                                                    </div>
                                                                ) : (<p>Empty</p>)
                                                        }
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === "level") {
                                                return (
                                                    <TableCell key={column.id}>
                                                        <div className="moderatorstudentstable_gender">
                                                            {/* <select
                                                                name="level"
                                                                id="levels"
                                                                value={row.level}
                                                                onChange={(e) => changeLeavel(e.target.value, row.id)}
                                                            >
                                                                {levels.map((level, index) => {
                                                                    return (
                                                                        <option key={level}
                                                                                value={level}>{level}</option>
                                                                    )
                                                                })}
                                                            </select> */}
                                                        </div>
                                                    </TableCell>
                                                )
                                            }
                                            if (column.id === "setmeeting") {
                                                return (
                                                    <TableCell key={column.id}>
                                                        <div className='set_meeting'>
                                                            <LocalizationProvider
                                                                dateAdapter={AdapterDateFns}
                                                                locale={ruLocale}
                                                            >
                                                                {row.class ?
                                                                    (row.class.status === 'INPROGRESS') || (row.class.status === 'READY') || (Math.abs((new Date(row.class.startDate).getTime() - +new Date()) <= 60 * 10000)) ?
                                                                        // (row.class.status === 'INPROGRESS') || (row.class.status === 'READY') || ((Math.abs((new Date(row.class.startDate).getTime() - (new Date()).getTime()))) <= 10 * 60000) && row.class.status === 'UPCOMING' ?
                                                                        <button
                                                                            className='join_to_meeting'
                                                                            onClick={() => joinToClass(row.class.roomNumber)}>Join
                                                                            to meeting</button>
                                                                        :
                                                                        <DateTimePicker
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
                                                    <div className="moderatorstudentstable_unader">
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
            <div className="moderator_student_pagenation">
                <select className="select_student" onChange={limitChange}>
                    <option defaultValue='5'>5</option>
                    <option defaultValue='10'>10</option>
                    <option defaultValue='15'>15</option>
                  </select>
                <button className="prev_student" disabled={prev} onClick={() => prevPage()}><ArrowBackIosNewIcon/></button>
                <button className="next_student" disabled={next} onClick={() => nextPage()}><ArrowForwardIosIcon/></button>
            </div>
        </Paper>
    )
}
