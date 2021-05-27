import React, { useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {IoMdPersonAdd} from 'react-icons/io';
import {BsPersonCheckFill} from 'react-icons/bs'
import {BsClipboardData} from 'react-icons/bs'
import {FaUserEdit} from 'react-icons/fa';
import './Home.css'


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function HomePage(props) {
    const dispatch = useDispatch()
    const role = useSelector(store => store.user.role)
    console.log(role)

    const BootstrapButton = withStyles({
        root: {
            boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2);',
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
                boxShadow: '0 0 0 0.8rem rgba(0,123,255,.5)',
            },
        },
    })(Button);

    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: "HOME"})
        dispatch({type: 'RESET_PARTICIPANTS'})
        dispatch({type: 'RESET_SESSION'})
    }, [])
    
    const createGroup = () => {
        if(role === 'Super Admin'){
        return(
        <Link to="/newgroup">
            <BootstrapButton className='button'><FaUserEdit size="30px" className="homeIcon"></FaUserEdit><span className="vertical-line5"></span> <span className="btnText">Create Group</span></BootstrapButton>
        </Link>
        
        )
        }
    }

    if(role === 'Super Admin' || role === 'Site Admin') {
    return (
        <div class="container">
            <div class="center">
                <Link to="/selectparticipant">
                    <BootstrapButton className='button'><BsPersonCheckFill size="30px" className="homeIcon"></BsPersonCheckFill><span className="vertical-line1"></span> Select Participant</BootstrapButton>
                </Link>
                <Link to="/addparticipant">
                    <BootstrapButton className='button'><IoMdPersonAdd size="30px" className="homeIcon"></IoMdPersonAdd><span className="vertical-line3"></span> Add Participant</BootstrapButton>
                </Link>
                <Link to="/CreateUser">
                    <BootstrapButton className='button'><IoMdPersonAdd size="30px" className="homeIcon"></IoMdPersonAdd><span className="vertical-line"></span> Create User</BootstrapButton>
                </Link>
                <Link to="/edit">
                    <BootstrapButton className='button'><FaUserEdit size="30px" className="homeIcon"></FaUserEdit><span className="vertical-line4"></span> <span className="btnText">Edit Users</span></BootstrapButton>
                </Link>
                <Link to="/pin">
                    <BootstrapButton className='button'>
                        <BsClipboardData size="30px" className="userHomeIcon"></BsClipboardData><span className="vertical-line"></span> Dashboard
                    </BootstrapButton>
                </Link>
                {createGroup()}
            </div>
        </div>
    );} else {
        return(
            <>
            <div class="container">
                <div class="center">
                    <Link to="/selectparticipant">
                        <BootstrapButton className='button'><BsPersonCheckFill></BsPersonCheckFill> Select Participant</BootstrapButton>
                    </Link>
                    <Link to="/addparticipant">
                        <BootstrapButton className='button'><IoMdPersonAdd></IoMdPersonAdd>Add Participant</BootstrapButton>
                    </Link>
                    <Link to="/pin">
                        <BootstrapButton className='button'>
                            <BsClipboardData size="30px" className="userHomeIcon"></BsClipboardData><span className="vertical-line"></span> Dashboard
                        </BootstrapButton>
                    </Link>
                </div>
            </div>
            </>
        )
    }
}

export default connect(mapStoreToProps)(HomePage);