import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "UPDATE_PARTICIPANT" actions
function* updateParticipant(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log(action.payload)
    yield axios.post('/api/participants/update', action.payload);
    yield put({ type: 'FETCH_PARTICIPANTS' });
  } catch (error) {
    console.log('Participant POST request failed', error);
  }
}

function* participantupdateSaga() {
  yield takeLatest('UPDATE_PARTICIPANT', updateParticipant);
}

export default participantupdateSaga;