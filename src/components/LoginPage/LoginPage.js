import React, { useEffect  } from 'react';
import { useHistory } from 'react-router-dom' 
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm/LoginForm';


const LoginPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()
    

  useEffect( () => {
    dispatch({type: 'SET_PAGE', payload: "LOGIN"})
  }, [] );

  const goToRegistration = () => {
    history.push('/registration');
  }

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={goToRegistration}
        >
          Register Participant
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
