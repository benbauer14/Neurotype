import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {BsFillPersonPlusFill} from 'react-icons/bs'
import {IoMdPersonAdd} from 'react-icons/io';
import './AddPatient.css';
import axios from 'axios';


function AddParticipant(props) {
    const dispatch = useDispatch();
    const role = useSelector((store) => store.user.role)
    const groupid = useSelector((store) => store.user.group_id)

    const BarStyling = { width: "20rem", height: 25, background: "#F2F1F9", border: "none", padding: "0.5rem" };
    const SelectStyling = { width: "21rem", height: 40, border: "none", textAlign: "left" };

    let [patientName, setPatientName] = useState('');
    let [gender, setGender] = useState('');
    let [birthdate, setBirthdate] = useState('');
    let [height, setHeight] = useState('');
    let [weight, setWeight] = useState('');
    let [groups, setGroups] = useState('')
    let [group_id, setGroupId] = useState()

    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: "ADDPARTICIPANT"})
        axios.get('/api/groups').then((response) => {
            setGroups(response.data)
            }).catch((err) => {
            console.log("Error getting groups", err)
            })
        setGroupId(groupid)
    }, [])


    const participant = {
        name: patientName,
        gender: gender,
        birthdate: birthdate,
        height: height,
        weight: weight,
        group_id: group_id
    }
    
    const history = useHistory()
    const addParticipant = () => {
        dispatch({type: 'POST_PARTICIPANT', payload: participant})
        history.push('/')
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
    if(role === 'Super Admin'){
    return (
        <>

            <h2 className='createNewPart'>Create New Participant</h2>
            <div className="center">
            <div className="addBtn1">
                <input className='addPart' style={BarStyling} placeholder="Participant ID" value={patientName} onChange={(event) => setPatientName(event.target.value)}></input>
                <select className='addPartSelect' style={SelectStyling} placeholder="Role" value={role} onChange={(event) => setGender(event.target.value)}>
                    <option value="" hidden>Gender</option>
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                </select>
                <input className='addPart' style={BarStyling} placeholder="Birthdate" type="date" value={birthdate} onChange={(event) => setBirthdate(event.target.value)}></input>
                <input className='addPart' style={BarStyling} placeholder="Height (inches)" type="number" value={height} onChange={(event) => setHeight(event.target.value)}></input>
                <input className='addPart' style={BarStyling} placeholder="Weight (lb)" type="number" value={weight} onChange={(event) => setWeight(event.target.value)}></input> 

                    <BootstrapButton className='button' onClick={() => addParticipant()}><IoMdPersonAdd size="30px" className="homeIcon"> </IoMdPersonAdd><span className="vertical-line"></span> Create Participant</BootstrapButton>
                    

            </div>
            </div>
        </>
    );
}else{
    return (
        <>
            <h2 className='createNewPart'>Create New Participant</h2>

            <div className="center">
                <input className='addPart' placeholder="Participant ID" value={patientName} onChange={(event) => setPatientName(event.target.value)}></input>
                <select className='addPartSelect' placeholder="Role" value={role} onChange={(event) => setGender(event.target.value)}>
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                </select>
                <input placeholder="Birthdate" type="date" value={birthdate} onChange={(event) => setBirthdate(event.target.value)}></input>
                <input placeholder="Height (inches)" type="number" value={height} onChange={(event) => setHeight(event.target.value)}></input>
                <input placeholder="Weight (lb)" type="number" value={weight} onChange={(event) => setWeight(event.target.value)}></input> 
                    <BootstrapButton className='button' onClick={() => addParticipant()}><BsFillPersonPlusFill></BsFillPersonPlusFill><span className="vertical-line4"></span> <span className="btnText">Add Participant</span></BootstrapButton>
                    <BootstrapButton className='button'><IoMdPersonAdd size="30px" className="homeIcon"></IoMdPersonAdd><span className="vertical-line"></span> Create User</BootstrapButton>
            </div>

        </>
    );
}
}
export default connect(mapStoreToProps)(AddParticipant);