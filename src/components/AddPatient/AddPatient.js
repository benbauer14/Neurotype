import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


function AddParticipant(props) {
    const dispatch = useDispatch();

    let [patientName, setPatientName] = useState('');
    let [gender, setGender] = useState('');
    let [birthdate, setBirthdate] = useState('');
    let [height, setHeight] = useState('');
    let [weight, setWeight] = useState('');

    
    const participant = {
        patientName: patientName,
        gender: gender,
        birthdate: birthdate,
        height: height,
        weight: weight
    }
    

    const addParticipant = () => {
        dispatch({type: 'ADD_PARTICIPANT', payload: participant})
    }

    console.log(patientName)

    return (
        <div className="formPanel">
            <input placeholder="Name" value={patientName} onChange={(event) => setPatientName(event.target.value)}></input>
            <br/>
            <input placeholder="Gender" value={gender} onChange={(event) => setGender(event.target.value)}></input>
            <br/>
            <input placeholder="Birthdate" value={birthdate} onChange={(event) => setBirthdate(event.target.value)}></input>
            <br/>
            <input placeholder="Height" value={height} onChange={(event) => setHeight(event.target.value)}></input>
            <br/>
            <input placeholder="Weight" value={weight} onChange={(event) => setWeight(event.target.value)}></input>
            <br/>
            <button className="btn" onClick={() => addParticipant()}>Add</button>
        </div>
    );
}

export default connect(mapStoreToProps)(AddParticipant);