import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';


function AddParticipant(props) {
    const dispatch = useDispatch();

    let [patientName, setPatientName] = useState('');
    // let [gender, setGender] = useState('');
    // let [birthdate, setBirthdate] = useState('');
    // let [height, setHeight] = useState('');
    // let [weight, setWeight] = useState('');

    
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

    return (
        <>
            <h3>Create New Participant</h3>
            <div>
                <input placeholder="Participant ID" value={patientName} onChange={(event) => setPatientName(event.target.value)}></input>
                {/* <input placeholder="Gender" value={gender} onChange={(event) => setGender(event.target.value)}></input>
                <input placeholder="Birthdate" value={birthdate} onChange={(event) => setBirthdate(event.target.value)}></input>
                <input placeholder="Height" value={height} onChange={(event) => setHeight(event.target.value)}></input>
                <input placeholder="Weight" value={weight} onChange={(event) => setWeight(event.target.value)}></input> */}
                <Link to={`/checkin/${participant.name}`}>
                    <button onClick={() => addParticipant()}>Add</button>
                </Link>
            </div>
        </>
    );
}

export default connect(mapStoreToProps)(AddParticipant);