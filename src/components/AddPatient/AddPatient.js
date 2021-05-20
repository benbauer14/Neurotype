import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {BsFillPersonPlusFill} from 'react-icons/bs'
import './AddPatient.css';


function AddParticipant(props) {
    const dispatch = useDispatch();
    const role = useSelector((store) => store.user.role)

    let [patientName, setPatientName] = useState('');
    // let [gender, setGender] = useState('');
    // let [birthdate, setBirthdate] = useState('');
    // let [height, setHeight] = useState('');
    // let [weight, setWeight] = useState('');
    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: "ADDPARTICIPANT"})
    }, [])

    const participant = {
        name: patientName,
        // gender: gender,
        // birthdate: birthdate,
        // height: height,
        // weight: weight
    }
    

    const addParticipant = () => {
        dispatch({type: 'POST_PARTICIPANT', payload: participant})
    }

    console.log(patientName)

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
    console.log(role)
    return (
        <>
            <h2 className='createNewPart'>Create New Participant</h2>
            <div>
                <input className='addPart' placeholder="Participant ID" value={patientName} onChange={(event) => setPatientName(event.target.value)}></input>
                {/* <input placeholder="Gender" value={gender} onChange={(event) => setGender(event.target.value)}></input>
                <input placeholder="Birthdate" value={birthdate} onChange={(event) => setBirthdate(event.target.value)}></input>
                <input placeholder="Height" value={height} onChange={(event) => setHeight(event.target.value)}></input>
                <input placeholder="Weight" value={weight} onChange={(event) => setWeight(event.target.value)}></input> */}
                <Link to={`/checkin/${participant.name}`}>
                    <BootstrapButton className='addPartBtn' onClick={() => addParticipant()}><BsFillPersonPlusFill></BsFillPersonPlusFill></BootstrapButton>
                </Link>
            </div>
        </>
    );
}

export default connect(mapStoreToProps)(AddParticipant);