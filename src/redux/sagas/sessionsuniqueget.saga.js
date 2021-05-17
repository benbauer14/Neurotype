import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUniqueSessions(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/session/participant/?p=' + action.payload.name);
    console.log(response.data)
    yield put({ type: 'SET_SESSIONS', payload: response.data });
  } catch (error) {
    console.log('Sessions GET request failed', error);
  }
}

function* sessionsUniqueSaga() {
  yield takeLatest('FETCH_UNIQUESESSIONS', fetchUniqueSessions);
}

export default sessionsUniqueSaga;
