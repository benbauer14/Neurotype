import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function HomePage(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    //   const [heading, setHeading] = useState('Functional Component');

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