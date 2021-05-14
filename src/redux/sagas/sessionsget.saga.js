import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchSessions() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/session/all');
    console.log(response.data)
    yield put({ type: 'SET_SESSIONS', payload: response.data });
  } catch (error) {
    console.log('Sessions GET request failed', error);
  }
}

function* sessionsGetSaga() {
  yield takeLatest('FETCH_SESSIONS', fetchSessions);
}

export default sessionsGetSaga;
