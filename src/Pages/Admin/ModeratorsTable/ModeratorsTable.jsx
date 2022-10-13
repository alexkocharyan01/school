import {DeleteOutline} from "@mui/icons-material";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import "./ModeratorsTable.scss";
import {useDispatch, useSelector} from "react-redux";
import {tableUser, tableUserDelete} from "../AdminAddModeratrSlice";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const columns = [
    {id: "firstname", label: "Firstname", minWidth: 100},
    {id: "lastname", label: "Lastname", minWidth: 100},
    {id: "email", label: "Email", minWidth: 100},
    {id: "role", label: "Role", minWidth: 100},
    {id: "delete", label: "Delete", minWidth: 100}
];

function ModeratorsTable({show, searchValue}) {

    const [offset, setOffset] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [render, setRender] = useState(false);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);

    const dispatch = useDispatch()

    const token = localStorage.getItem('ACCESS_TOKEN');

    const data = useSelector((state) => state.addModerator.userData)

    const totalItemCouts = data.count

    const nextPage = useCallback(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset: offset + 1,
            name: searchValue
        }
        setOffset(offset + 1)
        setPrev(false)
        dispatch(tableUser(value))
    })

    const prevPage = useCallback(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset: offset - 1,
            name: searchValue
        }
        setOffset(offset - 1)
        setNext(false)
        dispatch(tableUser(value))
    })

    const limitChange = (event) => {
        setRowsPerPage(+event.target.value);
        setOffset(1);
        const value = {
            token,
            limit: +event.target.value,
            offset: 1,
            name: searchValue
        }
        dispatch(tableUser(value))
    };

    const handleDelete = (id) => {
        const value = {
            id,
            token
        }
        dispatch(tableUserDelete(value))
        setRender(!render)
    }

    useEffect(() => {
        const value = {
            token,
            limit: rowsPerPage,
            offset,
            name: searchValue
        }
        dispatch(tableUser(value))
    }, [show, render, searchValue])

    useEffect(() => {
        if (offset === 1) {
            setPrev(true)
        }
    }, [offset])

    useEffect(() => {
        if (totalItemCouts && offset === Math.ceil(totalItemCouts / rowsPerPage)) {
            setNext(true)
        } else if (totalItemCouts === 0) {
            setNext(true)
        } else if( rowsPerPage > totalItemCouts || rowsPerPage === totalItemCouts){
            setNext(true)
        } else {
            setNext(false)
        }
    })

    return (
        <Paper>
            <TableContainer sx={{maxHeight: 690}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <>
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{top: 57, minWidth: column.minWidth}}
                                    >
                                        {column.label}
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
                                            if (column.id === "delete") {
                                                return (
                                                    <TableCell align={column.align} key={row.id}>
                                                        <button
                                                            className="admin_delete_button"
                                                            onClick={() => handleDelete(row.id)}
                                                        >
                                                            <DeleteOutline/>
                                                        </button>
                                                    </TableCell>
                                                );
                                            }
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="admin_pagination">
                <select className="select" onChange={limitChange}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                </select>
                <button className="prev" disabled={prev} onClick={() => prevPage()}><ArrowBackIosNewIcon/></button>
                <button className="next" disabled={next} onClick={() => nextPage()}><ArrowForwardIosIcon/></button>
            </div>
        </Paper>
    )
}

export default ModeratorsTable
