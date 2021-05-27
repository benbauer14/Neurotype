import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import './Dashboard.css'

import { CSVLink } from 'react-csv'
// import { Searchbar } from 'react-native-paper';

import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import {FiDownload} from 'react-icons/fi'

// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import SaveIcon from '@material-ui/icons/Save';
import { IoCloudDownload } from 'react-icons/io5';
import { BsPersonCheckFill } from 'react-icons/bs'


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


  // const useStyle = makeStyles({
  //   table: {
  //     minWidth: "30%",
  //     maxWidth: "40%",
  //     marginLeft: "auto",
  //     marginRight: "auto",
  //   },
  // });

  // const classes = useStyle();

  const BootstrapButton = withStyles({
    root: {
      boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2);',
      textTransform: 'none',
      textDecoration: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: 'rgb(32, 115, 136)',
      borderColor: 'rgb(32, 115, 136)',
      color: 'white',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: 'rgb(39, 136, 160)',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button);

  useEffect(() => {
    if (user.role === 'Super Admin') {
      dispatch({ type: "FETCH_SESSIONS" })
    } else {
      console.log(user.group_id)
      dispatch({ type: "FETCH_SESSIONGROUP", payload: user.group_id })
    }
    dispatch({ type: 'SET_PAGE', payload: "DASHBOARD" })
  }, [])

  console.log(props)

  // return (
  //     <>
  //         {JSON.stringify(sessions)}
  //     </>
  // )
  const dateTimeFormat = (datetime) => {
    //format yyyy-mm-ddThh:mm:ss:mlsZ
    return(datetime.slice(5,7) + "-" + datetime.slice(8,10) + "-" + datetime.slice(0,4) + " " + datetime.slice(11,13)+":" + datetime.slice(14,16) + ":" + datetime.slice(17,19))
    }

  return (
    <>
      <div className="tablebox">

        <Table className='dashTable'>
          <TableHead component='th'>
            <TableRow>
              <TableCell > <span className='seshDash'>Session ID</span></TableCell>
              <TableCell ><span className='researchDash'>Researcher</span></TableCell>
              <TableCell ><span className='researchDash'>Participant</span></TableCell>
              <TableCell >Group</TableCell>
              <TableCell >EEG Raw Data</TableCell>
              <TableCell >Survey Raw Data</TableCell>
              <TableCell >Date/Time</TableCell>
            </TableRow>
          </TableHead>

          {sessions.map((session, index) => {
            return (
              <>
                <TableBody key={index} className='hover={true}' component={Paper}>
                  <TableRow hover={true}>
                    <StyledTableCell scope="row"><span className='seshDash'>{session.id}</span></StyledTableCell>
                    <StyledTableCell scope="row">{session.researchername}</StyledTableCell>

                    <StyledTableCell  scope="row"><span className='partDash'>{session.participantname}</span></StyledTableCell>
                    <StyledTableCell  scope="row"><span className='partDash'>{session.researchgroup}</span></StyledTableCell>
                    <StyledTableCell align="center" scope="row"><a target="_blank" href={session.run}><BootstrapButton><FiDownload></FiDownload></BootstrapButton></a></StyledTableCell>
                    <StyledTableCell align="center" scope="row"><a target="_blank" href={session.csvlocation}><BootstrapButton><FiDownload></FiDownload></BootstrapButton></a></StyledTableCell>
                    <StyledTableCell align="center" scope="row"><span className="datetime">{dateTimeFormat(session.time)}</span></StyledTableCell>

                  </TableRow>
                </TableBody>
              </>
            )
          })}
        </Table>

        {/* <CSVLink data={participants} filename={"all-patients-info.csv"}><button>Download CSV</button></CSVLink> */}
        {/* <a target="_blank" href={activity.link}>{activity.link}</a> */}
        {/* <Link to={`/userhome/${filter.name}`} data={filter}><BootstrapButton><BsPersonCheckFill></BsPersonCheckFill></BootstrapButton></Link> */}

      </div>
    </>
  )

}





export default Dashboard;