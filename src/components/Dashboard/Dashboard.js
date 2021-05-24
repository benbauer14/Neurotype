import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { CSVLink } from 'react-csv'
// import { Searchbar } from 'react-native-paper';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import SaveIcon from '@material-ui/icons/Save';
import {IoCloudDownload} from 'react-icons/io5';
import {BsPersonCheckFill} from 'react-icons/bs'


const Dashboard = (props) => {
    const dispatch = useDispatch();
    const sessions = useSelector((store) => store.sessions);
    const user = useSelector((store) => store.user);
    
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 16,
        },
    }))(TableCell);


    const useStyle = makeStyles => ({
        table: {
            minWidth: 450,
            maxWidth: 650
        },
    });

    const classes = useStyle();


    useEffect(() => {
        if(user.role === 'Super Admin'){
            dispatch({type: "FETCH_SESSIONS"})
        }else{
            console.log(user.group_id)
            dispatch({type: "FETCH_SESSIONGROUP", payload: user.group_id})
        }

        dispatch({type: 'SET_PAGE', payload: "DASHBOARD"})
    },[])


    console.log(props)

    // return (
    //     <>
    //         {JSON.stringify(sessions)}
    //     </>
    // )
    return (
        <>
            <div>
                <h1>Dashboard</h1>
                
                <Table className={classes.table}>
                    <TableHead component='th'>
                        <TableRow>
                            <TableCell style={{width:'5%'}} align="center">Session ID</TableCell>
                            <TableCell align="center">Researcher</TableCell>
                            <TableCell align="center">Participant</TableCell>
                            <TableCell align="center">Group</TableCell>
                            <TableCell align="center">EEG Raw Data</TableCell>
                            <TableCell align="center">Survey Raw Data</TableCell>
                            <TableCell align="center">Date/Time</TableCell>
                        </TableRow>
                    </TableHead>
                    
                        {sessions.map((session, index) => {
                            return (
                                <>

                                    <TableBody key={index} className='hover={true}' component={Paper}>
                                        <TableRow hover={true}>
                                            <StyledTableCell align="center" scope="row">{session.id}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{session.researchername}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{session.participantname}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{session.researchgroup}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{session.run}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{session.csvlocation}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{session.time}</StyledTableCell>                                           
                                        </TableRow>
                                    </TableBody>
                                </>
                            )

                        })}

                    

                </Table>
                
                {/* <CSVLink data={participants} filename={"all-patients-info.csv"}><button>Download CSV</button></CSVLink> */}



            </div>
        </>
    )

}





export default Dashboard;