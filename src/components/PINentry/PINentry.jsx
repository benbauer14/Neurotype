import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link} from 'react-router-dom';
import PinInput from 'react-pin-input';
import { useHistory } from 'react-router';

function PINentry(props) {
  const [PIN, setPIN] = useState('');
  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    dispatch({type: 'SET_PAGE', payload: "PIN"});
  }, []);

  let userGroup = useSelector((store) => {
    return store.user.group_id;
  });
  let correctPIN = useSelector((store) => {
    return store.pin
  })

  const submitPIN = () => {
    if (correctPIN === parseInt(PIN)) {
      history.push('/dashboard')
    } else {
      alert('INCORRECT PIN')
    }
  }

  return (
    <div className="center-box">
      <h2>Please enter PIN to view the dashboard.</h2>
      {/* using react-pin-input */}
      <PinInput
        length={5}
        initialValue=""
        secret
        onChange={(value, index) => { setPIN(value); dispatch({type: 'FETCH_PIN'}); }}
        type="numeric"
        inputMode="number"
        style={{ padding: "10px", alignContent: 'center' }}
        inputStyle={{ borderColor: "#098b8d" }}
        inputFocusStyle={{ borderColor: "white" }}
        onComplete={(value, index) => { }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <input className="btn" type="submit" name="submit" value="Submit" onClick={submitPIN}/>
    </div>
  );
}

export default connect(mapStoreToProps)(PINentry);
