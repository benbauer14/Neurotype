import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link} from 'react-router-dom';
import PinInput from 'react-pin-input';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'

import './PINentry.css'

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

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const submitPIN = () => {
    if (correctPIN === parseInt(PIN)) {
      history.push('/dashboard')
    } else {
      // alert('INCORRECT PIN')
      Toast.fire({
        title: 'Incorrect PIN',
        // text: 'User Disabled',
        icon: 'error',
        // toast: true
    })
    }
  }

  const BootstrapButton = withStyles({
    root: {
        boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2);',
        textTransform: 'none',
        textDecoration: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'rgb(32, 115, 136)',
        borderColor: 'rgb(32, 115, 136)',
        color: 'white',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: 'rgb(39, 136, 160)',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

  return (
    <div className="center-box">
      <h2 className='pinEntry'>Please enter PIN</h2>
      {/* using react-pin-input */}
      <PinInput
        
        length={5}
        initialValue=""
        secret
        onChange={(value, index) => { setPIN(value); dispatch({type: 'FETCH_PIN'}); }}
        type="numeric"
        inputMode="number"
        style={{ padding: "10px", alignContent: 'center' }}
        inputStyle={{ borderColor: "#098b8d", backgroundColor: 'white' }}
        inputFocusStyle={{ borderColor: "white" }}
        onComplete={(value, index) => { }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      <BootstrapButton className="pinBtn" type="submit" name="submit" value="Submit" onClick={submitPIN}>Submit</BootstrapButton>
    </div>
  );
}

export default connect(mapStoreToProps)(PINentry);
