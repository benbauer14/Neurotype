import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUsers() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user/register/users');
    console.log(response.data)
    yield put({ type: 'SET_USERSINFO', payload: response.data });
  } catch (error) {
    console.log('Participants GET request failed', error);
  }
}

function* usersGetSaga() {
  yield takeLatest('FETCH_USERS', fetchUsers);
}

export default usersGetSaga;
