import React from 'react';
import { connect } from 'react-redux';
import {IoLogOutOutline} from 'react-icons/io5';
import './LogOutButton.css';
import { useHistory } from 'react-router';

const LogOutButton = (props) => {
  const history = useHistory();
  return (
  <button
    // This button shows up in multiple locations and is styled differently
    // because it's styled differently depending on where it is used, the className
    // is passed to it from it's parents through React props
    className={props.className}
    onClick={() => {props.dispatch({ type: 'LOGOUT' }); 
    history.push('/');
    }}
  ><div><IoLogOutOutline className='logOutIcon' size="20px"></IoLogOutOutline></div>
    Log Out
  </button>
)};

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
