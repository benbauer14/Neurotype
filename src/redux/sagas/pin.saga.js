import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchPIN() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/pin', config);
    console.log(response.data)
    yield put({ type: 'SET_PIN', payload: response.data.pin_number });
  } catch (error) {
    console.log('pin GET request failed', error);
  }
}

function* pinSaga() {
  yield takeLatest('FETCH_PIN', fetchPIN);
}

export default pinSaga;