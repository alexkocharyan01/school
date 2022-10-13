import React, {useEffect, useState, useCallback} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import "./NotificationTable.scss";
import {useDispatch, useSelector} from "react-redux";
import {
    moderatorNotification,
    moderatorNotificationChange,
    moderatorNotificationChangeFInish
} from '../ModeratorNotificationSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const columns = [
    {id: "text", label: "Notification", minWidth: 130, maxHeight: 10},
    {id: "name", label: "Sender Name", minWidth: 130, maxHeight: 10},
    {id: "sendtime", label: "Send Time", minWidth: 90, maxHeight: 10},
    {id: "moderatorname", label: "Moderator Name", minWidth: 120, maxHeight: 10},
    {id: "starttime", label: "Start time", minWidth: 90, maxHeight: 10},
    {id: "endtime", label: "End Time", minWidth: 90, maxHeight: 10},
    {id: "doit", label: "Do It", minWidth: 80, maxHeight: 10},
    {id: "message", label: "Message", minWidth: 80, maxHeight: 10},
];

export default function NotificationTable() {

    const [offset, setOffset] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [notofication, setNotofication] = useState([]);
    const [take, setTake] = useState(false);
    const [status, setStatus] = useState(false);
    const [tableData, setTableData] = useState(false);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    const data = useSelector((state => state.moderatorNotification.data))

    const dispatch = useDispatch()

    const token = localStorage.getItem('ACCESS_TOKEN');

    const totalItemCouts = data.count

    const handleChangePage = (event, newPage) => {
        setOffset(newPage);
        setTableData(!tableData)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setOffset(0);
    };

    const changeNotification = (notificationId) => {

        const value = {
            notificationId,
            token
        }
        setTake(!take)
        dispatch(moderatorNotificationChange(value))
    }

    const finishChanges = (notificationId) => {
        const value = {
            notificationId,
            token
        }
        setStatus(!status)
        dispatch(moderatorNotificationChangeFInish(value))
    }

    const nextPage = useCallback(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset: rowsPerPage + offset,
        }
        setOffset(rowsPerPage + offset)
        setPrev(false)
        dispatch(moderatorNotification(value))
    })

    const prevPage = useCallback(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset: rowsPerPage - offset
        }
        setOffset(rowsPerPage - offset)
        setNext(false)
        dispatch(moderatorNotification(value))
    })

    const limitChange = (event) => {
        const value = {
            token,
            limit: +event.target.value,
            offset: 0
        }
        setRowsPerPage(+event.target.value);

        dispatch(moderatorNotification(value))
    };

    useEffect(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset
        }
        dispatch(moderatorNotification(value))
    }, [take, status])

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

    useEffect(() => {
        setNotofication(data.data)
    }, [data.data])

    return (
        <Paper sx={{width: "60"}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{maxHeight: 30}}>
                            {columns.map((column) => (
                                <>
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            top: 57,
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
                        {notofication && notofication
                            .map((row) => {
                                let creator = row.sender;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            {
                                                if (column.id === "name" && creator) {
                                                    return (
                                                        <TableCell>
                                                            {creator.firstname + ' ' + creator.lastname}
                                                        </TableCell>
                                                    )
                                                }
                                            }
                                            {
                                                if (column.id === "sendtime") {
                                                    return (
                                                        <TableCell>
                                                            {new Date().toDateString(row.sendDate)}
                                                        </TableCell>
                                                    )
                                                }
                                            }
                                            {
                                                if (column.id === "starttime") {
                                                    return (
                                                        <TableCell>
                                                            {row.startProcessingDate
                                                                ? (new Date().toDateString(row.startProcessingDate)) : null
                                                            }
                                                        </TableCell>
                                                    )
                                                }
                                            }
                                            {
                                                if (column.id === "endtime") {
                                                    return (
                                                        <TableCell>
                                                            {row.finishDate
                                                                ? (new Date().toDateString(row.finishDate)) : null
                                                            }
                                                        </TableCell>
                                                    )
                                                }
                                            }
                                            {
                                                if (column.id === "moderatorname") {
                                                    return (
                                                        <TableCell>
                                                            {row.taker ?
                                                                (row.taker.firstname + ' ' + row.taker.lastname)
                                                                :
                                                                <p></p>
                                                            }
                                                        </TableCell>
                                                    )
                                                }
                                            }
                                            {
                                                if (column.id === "doit") {
                                                    return (
                                                        <TableCell>
                                                            {
                                                                row.status === "NEW" ?
                                                                    (
                                                                        <div className="do_it">
                                                                            <button
                                                                                onClick={() => changeNotification(row.id)}>
                                                                                <p>Take</p></button>
                                                                        </div>)
                                                                    :
                                                                    (row.status === "INPROGRESS" ?
                                                                        <div className="do_it">
                                                                            <button
                                                                                onClick={() => finishChanges(row.id)}>
                                                                                <p>Finish</p></button>
                                                                        </div>
                                                                        :
                                                                        (<div>Finished</div>))
                                                            }
                                                        </TableCell>
                                                    )
                                                }
                                            }
                                            {
                                                if (column.id === "message") {
                                                    return (
                                                        <TableCell>
                                                            <div className="message">
                                                                <button><p>Message</p></button>
                                                            </div>
                                                        </TableCell>
                                                    )
                                                }
                                            }
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
            <div className='moderator_pagenation'>
                <select className='select' onChange={limitChange}>
                    <option defaultValue='10'>10</option>
                    <option defaultValue='15'>15</option>
                    <option defaultValue='20'>20</option>
                </select>
                <div>
                    <button className="prev" disabled={prev} onClick={() => prevPage()}><ArrowBackIosNewIcon/></button>
                    <button className="next" disabled={next} onClick={() => nextPage()}><ArrowForwardIosIcon/></button>
                </div>
            </div>
        </Paper>
    )
}
