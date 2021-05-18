import React, { useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {IoMdPersonAdd} from 'react-icons/io';
import {BsPersonCheckFill} from 'react-icons/bs'
import './Home.css'


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function HomePage(props) {
    const dispatch = useDispatch()
    


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
        dispatch({type: 'SET_PAGE', payload: "HOME"})
    }, [])

    return (
        <div class="container">
            <div class="center">
                <Link to="/selectparticipant">
                    <BootstrapButton className='button'><BsPersonCheckFill></BsPersonCheckFill> Select Participant</BootstrapButton>
                </Link>
                <Link to="/addparticipant">
                    <BootstrapButton className='button'><IoMdPersonAdd></IoMdPersonAdd>Add Participant</BootstrapButton>
                </Link>
            </div>
        </div>
    );
}

export default connect(mapStoreToProps)(HomePage);