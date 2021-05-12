import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "POST_PARTICIPANT" actions
function* postParticipant(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log(action.payload)
    yield axios.post('/api/participants/new', action.payload);
    yield put({ type: 'FETCH_PARTICIPANTS' });
  } catch (error) {
    console.log('Participant POST request failed', error);
  }
}

function* participantnewSaga() {
  yield takeLatest('POST_PARTICIPANT', postParticipant);
}

export default participantnewSaga;