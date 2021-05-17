import React, { Component } from 'react';
import { connect} from 'react-redux';
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
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
