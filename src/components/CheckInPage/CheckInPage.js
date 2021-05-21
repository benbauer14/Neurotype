import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {FaClipboardCheck, FaBrain} from 'react-icons/fa';
import {BsClipboardData} from 'react-icons/bs'
import './CheckIn.css'

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function CheckIn(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    //   const [heading, setHeading] = useState('Functional Component');

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

    console.log(props)

    return (
        <>
            <h3>{JSON.stringify(props.match.params.id)}</h3>
            <div class="container">
                <div class ='center'>
                    <Link to="/survey">
                        <BootstrapButton className='button' ><FaClipboardCheck></FaClipboardCheck>  Check In</BootstrapButton>
                    </Link>
                    <Link to="/experiment">
                        <BootstrapButton className='button'><FaBrain></FaBrain>Photo Activity</BootstrapButton>
                    </Link>
                    <Link to="/pin">
                        <BootstrapButton className='button'><BsClipboardData></BsClipboardData>Dashboard</BootstrapButton>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default connect(mapStoreToProps)(CheckIn);