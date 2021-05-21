import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import participants from './participants.reducer'
import users from './users.reducer'
import sessions from './sessions.reducer'
import page from './page.reducer'
import pin from './pin.reducer'
import currentsession from './session.reducer'

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  participants,
  users,
  sessions,
  currentsession,
  page,
  pin,
});

export default rootReducer;
