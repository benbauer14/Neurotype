import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { CSVLink } from 'react-csv'
// import { Searchbar } from 'react-native-paper';

import Select from 'react-select';

import Swal from 'sweetalert2'


// import 'sweetalert2/src/sweetalert2.scss'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import {MdDelete} from 'react-icons/md';
import {GrRevert} from 'react-icons/gr';

import './AdminEditPage.css';
import EditUserInfo from '../EditUserInfo/EditUserInfo';


const AdminEditPage = (props) => {
    const dispatch = useDispatch();
    const users = useSelector(store => store.users)
    const role = useSelector(store => store.user.role)

    useEffect(() => {
        dispatch({ type: "FETCH_USERS" })
        dispatch({type: 'SET_PAGE', payload: "SELECTPARTICIPANT"})
    }, [])

    console.log('Users', users)
    console.log(role)


    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

    let search = '';
    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);
    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);
    // conditionally renders the list of all natural areas or the filtered natural areas

    const displayList = () => {
        let display = users
        if (searched) {
            display = filtered
        }
        return display;
    }
    // handles search f
    const searchForParticipant = (e) => {
        search += e.target.value;
        console.log('search', search);
        // create a regex pattern that looks at each letter of the search query
        if (search.length > 0) {
            let pattern = search.split('').map(x => {
                return `(${x})`
            }).join('');
            // creates a regex based on the search pattern and looks globally and is case insensitive
            let regex = new RegExp(`${pattern}`, "gi");
            console.log(regex);
            // sets the filtered array equal to the sna's that match the query
            setFiltered(users.filter(user => (user.name + ' ').match(regex)))
            console.log(filtered);
            // set the search state to the opposite of what it was
            setSearched(true);
        } else {
            setSearched(false);
        }
    }

    const useStyle = makeStyles => ({
        table: {
            minWidth: 450,
            maxWidth: 650
        },
    });

    const classes = useStyle();

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 16,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

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

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    const handleDisable = () => {
        // dispatch({type: 'DISABLE_USER', payload: user})
        Toast.fire({
            title: 'User Disabled',
            // text: 'User Disabled',
            icon: 'warning'
        })
    }
    const handleEnable = () => {
        Toast.fire({
            title: 'User Enabled',
            icon: 'success'
        })
    }


    if(role === 'Super Admin' || role === 'Site Admin') {
    return (
        <>
            <div>
                <h1 className="selectPart">Edit Users</h1>
                <input // search bar for participants 
                    className="searchBar"
                    style={BarStyling}
                    key="random1"
                    // value={keyword}
                    placeholder={"search"}
                    onChange={(e) => searchForParticipant(e)}
                />
                
                {/* <CSVLink className="csvButton" data={participants} filename={"all-patients-info.csv"}><BootstrapButton variant="contained"
                    color="default"><IoCloudDownload value={{ style: { verticalAlign: 'middle' } }} ></IoCloudDownload> Download CSV</BootstrapButton></CSVLink> */}
                <Table className={classes.table} aria-label="customized table">
                    <TableHead component='th'>
                        <TableRow>
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Group</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Disable</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableHead className="tableHead">
                <tr>Select</tr>
            </TableHead> */}
                    {!searched ? // renders all participants 
                        users.map(user => {
                            if(user.disabled === false){
                            return (
                                <>

                                    <TableBody className='hover={true}' component={Paper}>
                                        <TableRow hover={true}>
                                            <StyledTableCell align="center" scope="row">{user.name}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{user.role}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{user.groupname}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Link to={`/editUser/${user.id}`}>
                                                    <BootstrapButton className="editBtn" >Edit</BootstrapButton>
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell align="center" scope="row">
                                                <BootstrapButton onClick={() => {dispatch({type: 'DISABLE_USER', payload: user}); {handleDisable()}}}>
                                                    <MdDelete></MdDelete>
                                                </BootstrapButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </>
                            )} else if(user.disabled === true){
                                return(
                                    <>

                                    <TableBody className='hover={true}' component={Paper}>
                                        <TableRow hover={true}>
                                            <StyledTableCell align="center" scope="row">{user.name}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{user.role}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{user.groupname}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <BootstrapButton className="editBtn">Edit</BootstrapButton>
                                            </StyledTableCell>
                                            <StyledTableCell align="center" scope="row">
                                                <BootstrapButton onClick={() => {dispatch({type: 'DISABLE_USER', payload: user}); {handleEnable()}}} >
                                                    <GrRevert></GrRevert>
                                                </BootstrapButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </>
                                )
                            }

                        })

                        : // if searched, render filtered participants

                        filtered.map(filter => {
                            if(filter.disabled === false){
                            return (
                                <>

                                    <TableBody component={Paper}>
                                        <TableRow >
                                            <StyledTableCell align="center">{filter.name}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{filter.role}</StyledTableCell>
                                            <StyledTableCell align="center">{filter.groupname}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <BootstrapButton className="editBtn">Edit</BootstrapButton>
                                            </StyledTableCell>
                                            <StyledTableCell align="center" scope="row">
                                                <BootstrapButton onClick={() => {dispatch({type: 'DISABLE_USER', payload: filter}); {handleDisable()}}}>
                                                    <MdDelete></MdDelete>
                                                </BootstrapButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </>
                            )} else if(filter.disabled === true){
                                return (
                                    <>
    
                                        <TableBody component={Paper}>
                                            <TableRow >
                                                <StyledTableCell align="center">{filter.name}</StyledTableCell>
                                                <StyledTableCell align="center" scope="row">{filter.role}</StyledTableCell>
                                                <StyledTableCell align="center">{filter.groupname}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <BootstrapButton className="editBtn">Edit</BootstrapButton>
                                                </StyledTableCell>
                                                <StyledTableCell align="center" scope="row">
                                                    <BootstrapButton onClick={() => {dispatch({type: 'DISABLE_USER', payload: filter}); {handleEnable()}}}>
                                                        <GrRevert className='revertBtn' ></GrRevert>
                                                    </BootstrapButton>
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableBody>
                                    </>
                                )
                            }
                        })
                    }

                </Table>

                {/* <CSVLink data={participants} filename={"all-patients-info.csv"}><button>Download CSV</button></CSVLink> */}



            </div>
        </>
    )
    } else {
        return(
            <>
                <h3>Must Be Admin To Edit</h3>
            </>
        )
    }
}

export default AdminEditPage;