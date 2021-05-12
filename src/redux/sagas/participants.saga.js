import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchParticipants() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/participants/all', config);
    console.log(response.data)
    yield put({ type: 'SET_PARTICIPANTS', payload: response.data });
  } catch (error) {
    console.log('Participants GET request failed', error);
  }
}

function* participantSaga() {
  yield takeLatest('FETCH_PARTICIPANTS', fetchParticipants);
}

export default participantSaga;
