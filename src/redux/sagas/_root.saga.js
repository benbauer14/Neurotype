import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import participantsSaga from './participants.saga'
import participantNewSaga from './participantnew.saga'
import participantupdateSaga from './participantupdate.saga';
import researcherupdateSaga from './researcherupdate.saga'
import usergetSaga from './userget.saga'
import sessionsGetSaga from './sessionsget.saga';
import sessionsUniqueSaga from './sessionsuniqueget.saga';
import pinSaga from './pin.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    participantsSaga(),
    participantNewSaga(),
    participantupdateSaga(),
    pinSaga(),
    researcherupdateSaga(),
    usergetSaga(),
    sessionsGetSaga(),
    sessionsUniqueSaga(),
  ]);
}
