import React, { Component, useEffect  } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {

  //    pageSet = () => {
  //   const dispatch = useDispatch()
  //   dispatch({type: 'SET_PAGE', payload: "LOGIN"})
  // }



  render() {
  //   useEffect(() => {
  //     this.pageSet()
  // },[])
    return (
      <div>
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register Participant
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
