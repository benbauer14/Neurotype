import React, { useState } from 'react';
import Select from 'react-select';


const QQDemographs = () => {

    const [ patientGender, setPatientGender ] = useState( '' );
    const [ patientAge, setPatientAge] = useState( 0 );

    const genderOptions = [
        { label: 'Female', value: 'Female'},
        { label: 'Male', value: 'Male' },
        { label: 'X', value: 'X' },
    ];
    
    return (
        <>
            <div>
                <h3>Age</h3>
                <Select 
                    
                />
            </div>

            <div>
                <h3>Gender</h3>
                <Select 
                    options={genderOptions}
                />
            </div>

        </>
    )
}

export default QQDemographs;