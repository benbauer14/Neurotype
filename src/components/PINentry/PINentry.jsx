import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PinInput from 'react-pin-input';

function PINentry(props) {
  
  return (
    <div>
      <h2>PIN entry page!</h2>
      <PinInput
      length={4}
      initialValue=""
      secret
      onChange={(value, index)=>{let array=[]; array.push(value); console.log(value);}}
      type="numeric"
      inputMode="number"
      style={{padding: "10px"}}
      inputStyle={{borderColor: "#098b8d"}}
      inputFocusStyle={{borderColor: "white"}}
      onComplete={(value, index)=>{}}
      autoSelect={true}
      regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
    </div>
  );
}

export default connect(mapStoreToProps)(PINentry);
