import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PinInput from 'react-pin-input';

function PINentry(props) {
  const [PIN, setPIN] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: 'SET_PAGE', payload: "PIN"})
}, [])

  return (
    <div className="center-box">
      <h2>Please enter PIN to view the dashboard.</h2>
      {/* using react-pin-input */}
      <PinInput
        length={5}
        initialValue=""
        secret
        onChange={(value, index) => { setPIN(value); }}
        type="numeric"
        inputMode="number"
        style={{ padding: "10px", alignContent: 'center' }}
        inputStyle={{ borderColor: "#098b8d" }}
        inputFocusStyle={{ borderColor: "white" }}
        onComplete={(value, index) => { }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <input className="btn" type="submit" name="submit" value="Submit" onClick={()=>{console.log(PIN);}}/>
    </div>
  );
}

export default connect(mapStoreToProps)(PINentry);
