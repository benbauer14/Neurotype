import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function HomePage(props) {
    const history = useHistory();

    return (
        <div className="formPanel">
            <button className="btn">Select Participant</button>
            <br/>
            <button className="btn" onClick={()=>{history.push('/addparticipant')}}>Add Participant</button>
        </div>
    );
}

export default connect(mapStoreToProps)(HomePage);