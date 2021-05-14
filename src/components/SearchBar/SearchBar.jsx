import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SelectParticipant from '../SelectParticipant/SelectParticipant';
import UserPage from '../UserPage/UserPage'


const SearchBar = ({ keyword, setKeyword }) => {
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    const participants = useSelector((store) => store.participants)

    let search = '';
    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);
    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);
    // conditionally renders the list of all natural areas or the filtered natural areas
    const displayList = () => {
        let display = <SelectParticipant participants={participants} />
        if( searched ) {
            display = <SelectParticipant participants={filtered} />
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
        <div>
        <input
            className="searchBar"
            style={BarStyling}
            key="random1"
            value={keyword}
            placeholder={"search trails"}
            onChange={(e) => searchForParticipant(e)}
        />
        
        {/* {trails.length && displayList()} */}
        {displayList}
        </div>
    );
}

export default SearchBar