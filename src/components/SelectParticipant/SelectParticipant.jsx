import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
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
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    
    let search = '';
    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);
    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);
    // conditionally renders the list of all natural areas or the filtered natural areas
    const displayList = () => {
        let display = participants 
        if( searched ) {
            display = filtered 
        }
        return display;
    }
    // handles search f
    const searchForParticipant = (e) => {
        search += e.target.value;
        console.log( 'search', search );
        // create a regex pattern that looks at each letter of the search query
        if( search.length > 0) {
            let pattern = search.split('').map( x => {
            return `(${x})`
            }).join('');
            // creates a regex based on the search pattern and looks globally and is case insensitive
            let regex = new RegExp(`${pattern}`, "gi");
            console.log(regex);
            // sets the filtered array equal to the sna's that match the query
            setFiltered(participants.filter( participant => (participant.name + ' ').match(regex)))
            console.log(filtered);
            // set the search state to the opposite of what it was
            setSearched(true);
        } else {
            setSearched(false);
        }
    }
    

    return (
        <>
        <div>
        <h2>Select Participant</h2>
        <input
            className="searchBar"
            style={BarStyling}
            key="random1"
            // value={keyword}
            placeholder={"search trails"}
            onChange={(e) => searchForParticipant(e)}
        />
        <button>Download</button>
        
            <th>
                <tr>Name</tr>
            </th>
            <th>
                <tr>Select</tr>
            </th>
                { !searched ?
                participants.map(participant => {
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
                })
                
                :
                
                filtered.map(filter => {
                    return(
                        <>
                            
                        <tbody>
                            <tr>
                                <td>{filter.name}</td> 
                                <td><Link to={`/checkin/${filter.name}`}><button>Select</button></Link></td>
                            </tr>
                        </tbody>
                        </>
                    )
    })
    }

        </div>
        </>
    )
}

export default SelectParticipant;