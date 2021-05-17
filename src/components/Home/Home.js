import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function HomePage(props) {
    const history = useHistory();
    const dispatch = useDispatch()
    dispatch({type: 'SET_PAGE', payload: "HOME"})

    return (
        <div>
            <Link to="/selectparticipant">
                <button>Select Participant</button>
            </Link>
            <Link to="/addparticipant">
                <button>Add Participant</button>
            </Link>
        </div>
    );
}

export default connect(mapStoreToProps)(HomePage);