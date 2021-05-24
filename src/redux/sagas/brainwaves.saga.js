import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "POST_BRAINWAVES" actions
function* postBrainwaves(action) {
    try {
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };
        console.log(action.payload)
        yield axios.post('/uploadToS3', action.payload);

	} catch (error) {
        console.log('Participant POST request failed', error);
	}
}

function* participantnewSaga() {
    yield takeLatest('POST_BRAINWAVES', postBrainwaves);
}

export default postBrainwaves;