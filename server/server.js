
const express = require('express');
require('dotenv').config();


const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const participantsRouter = require('./routes/participants.router')
const sessionsRouter = require('./routes/session.router')
const uploadRouter = require('./routes/s3upload.router')
const pinRouter = require('./routes/pin.router')
const surveyRouter = require('./routes/survey.router')
const groupRouter = require('./routes/group.router')
const eegRouter = require('./routes/eeg.router')

// Body parser middleware
// app.use(bodyParser.json();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb'}));


// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/participants', participantsRouter);
app.use('/api/session', sessionsRouter);
app.use('/api/s3upload', uploadRouter);
app.use('/api/pin', pinRouter);
app.use('/api/survey', surveyRouter);
app.use('/api/groups', groupRouter);
app.use('/api/eeg', eegRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

//AWS S3


/** Listen *  */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
