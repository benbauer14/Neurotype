import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import './SelectParticipant.css'


const SelectParticipant = () => {
    const dispatch = useDispatch();
    const participants = useSelector(store => store.participants)

    useEffect(() => {
        dispatch({type: "FETCH_PARTICIPANTS"})
    },[])

    console.log('Participants', participants)

    return (
        <>
        <h2>Select Participant</h2>
        <table>
            <th> Participants 
                {participants.map(participant => {
                    return (
                        <>
                            
                                <tbody>
                                    <tr>
                                        <td>ID</td>
                                        <td>{participant.name}</td> 
                                        <td><Link to={`/checkin/${participant.id}`}><button>Select</button></Link></td>
                                    </tr>
                                </tbody>
                        
                        </>
                    )
                })}
            </th> 
        </table>
        <button>Download</button>
        </>
    )
}

export default SelectParticipant;