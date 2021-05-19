import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "UPDATE_PARTICIPANT" actions
function* updateResearcher(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log(action.payload)
    yield axios.put('/api/user/register/update', action.payload);
  } catch (error) {
    console.log('Participant POST request failed', error);
  }
}

function* researcherupdateSaga() {
  yield takeLatest('UPDATE_RESEARCHER', updateResearcher);
}

export default researcherupdateSaga;