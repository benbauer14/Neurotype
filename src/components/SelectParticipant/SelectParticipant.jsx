import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { CSVLink } from 'react-csv'
// import { Searchbar } from 'react-native-paper';

import Select from 'react-select';
import './SelectParticipant.css'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import SaveIcon from '@material-ui/icons/Save';
import {IoCloudDownload} from 'react-icons/io5';


const SelectParticipant = () => {
    const dispatch = useDispatch();
    const participants = useSelector(store => store.participants)

    useEffect(() => {
        dispatch({ type: "FETCH_PARTICIPANTS" })
        dispatch({type: 'SET_PAGE', payload: "SELECTPARTICIPANT"})
    }, [])

    console.log('Participants', participants)


    let participantData = []
    console.log(participantData)

    participants.map(participant => {
        participantData.push(participant.name)
    })
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

    let search = '';
    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);
    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);
    // conditionally renders the list of all natural areas or the filtered natural areas
    const displayList = () => {
        let display = participants
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
            setFiltered(participants.filter(participant => (participant.name + ' ').match(regex)))
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
                backgroundColor: '#0069d9',
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



    return (
        <>
            <div>
                <h1 className="selectPart">Select Participant</h1>
                <input // search bar for participants 
                    className="searchBar"
                    style={BarStyling}
                    key="random1"
                    // value={keyword}
                    placeholder={"search"}
                    onChange={(e) => searchForParticipant(e)}
                />
                
                <CSVLink className="csvButton" data={participants} filename={"all-patients-info.csv"}><BootstrapButton variant="contained"
                    color="default"><IoCloudDownload value={{ style: { verticalAlign: 'middle' } }} ></IoCloudDownload> Download CSV</BootstrapButton></CSVLink>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead component='th'>
                        <TableRow>
                            <TableCell align="center">Participant Name</TableCell>
                            <TableCell align="center">Group #</TableCell>
                            <TableCell align="center">Select</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableHead className="tableHead">
                <tr>Select</tr>
            </TableHead> */}
                    {!searched ? // renders all participants 
                        participants.map(participant => {
                            return (
                                <>

                                    <TableBody className='hover={true}' component={Paper}>
                                        <TableRow hover={true}>
                                            <StyledTableCell align="center" scope="row">{participant.name}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{participant.group_id}</StyledTableCell>
                                            <StyledTableCell align="center"><Link to={`/checkin/${participant.name}`}><BootstrapButton>Select</BootstrapButton></Link></StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </>
                            )

                        })

                        : // if searched, render filtered participants

                        filtered.map(filter => {
                            return (
                                <>

                                    <TableBody component={Paper}>
                                        <TableRow >
                                            <StyledTableCell align="center">{filter.name}</StyledTableCell>
                                            <StyledTableCell align="center" scope="row">{filter.group_id}</StyledTableCell>
                                            <StyledTableCell align="center"><Link to={`/checkin/${filter.name}`}><button>Select</button></Link></StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </>
                            )
                        })
                    }

                </Table>

                {/* <CSVLink data={participants} filename={"all-patients-info.csv"}><button>Download CSV</button></CSVLink> */}



            </div>
        </>
    )
}

export default SelectParticipant;