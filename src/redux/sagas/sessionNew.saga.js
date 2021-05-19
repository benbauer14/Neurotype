import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "POST_PARTICIPANT" actions
function* postSession(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log(action.payload)
    const response = yield axios.post('/api/session/new', action.payload);
    yield put({ type: 'SET_SESSION', payload: response.data.rows[0]});
  } catch (error) {
    console.log('Participant POST request failed', error);
  }
}

function* sessionnewSaga() {
  yield takeLatest('POST_SESSION', postSession);
}

export default sessionnewSaga;