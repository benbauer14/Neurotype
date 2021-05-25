
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
    </div>
  );
}

export default LoginPage;
