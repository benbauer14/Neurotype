import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "UPDATE_USER" actions
function* updateUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log(action.payload)
    yield axios.post('/api/user/registration/update', action.payload);
    yield put({ type: 'FETCH_USERS' });
  } catch (error) {
    console.log('Update User request failed', error);
  }
}

function* addUser(action){
  try {
    yield axios.post('/register', action.payload)
  } catch (error) {
    console.log( 'Add new user request failed', error );
  }
}

function* participantupdateSaga() {
  yield takeLatest('ADD_RESEARCHER', addUser);
  yield takeLatest('UPDATE_USER', updateUser);
}

export default participantupdateSaga;