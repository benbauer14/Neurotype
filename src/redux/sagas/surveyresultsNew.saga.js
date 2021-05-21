import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "POST_PARTICIPANT" actions
function* postSurveyResults(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log(action.payload)
    const response = yield axios.post('/api/survey/new', action.payload);
  } catch (error) {
    console.log('Survey POST request failed', error);
  }
}

function* sessionnewSaga() {
  yield takeLatest('POST_SURVEY', postSurveyResults);
}

export default sessionnewSaga;