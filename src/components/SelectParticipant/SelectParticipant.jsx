import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
// import { Searchbar } from 'react-native-paper';
import Select from 'react-select';
import './SelectParticipant.css'


const SelectParticipant = () => {
    const dispatch = useDispatch();
    const participants = useSelector(store => store.participants)

    useEffect(() => {
        dispatch({type: "FETCH_PARTICIPANTS"})
    },[])

    console.log('Participants', participants)

    
    let participantData = []
    console.log(participantData)

    participants.map( participant => {
        participantData.push( participant.name )
    })


    return (
        <>

        <h2>Select Participant</h2>
        
        <table>
            <th>
                <tr>Name</tr>
            </th>
            <th>
                <tr>Select</tr>
            </th>
                {participants.map(participant => {
                    return (
                        <>
                            
                                <tbody>
                                    <tr>
                                        <td>{participant.name}</td> 
                                        <td><Link to={`/checkin/${participant.name}`}><button>Select</button></Link></td>
                                    </tr>
                                </tbody>
                        </>
                    )
                })}

        </table>
        
        <button>Download</button>

        {/* <MDBDataTable 
            striped
            bordered
            data={tableData()}
        /> */}


        </>
    )
}

export default SelectParticipant;