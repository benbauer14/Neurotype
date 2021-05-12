const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const name = req.body.name;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;

  const queryText = `INSERT INTO "user" (name, password, email, role, group_id )
    VALUES ($1, $2, $3, 'Researcher', '1') RETURNING id`;
  pool
    .query(queryText, [name, password, email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/register/update', (req, res, next) => {
  const name = req.body.name;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const role = req.body.role;
  const groupid = req.body.groupid;
  const disabled = req.body.disabled

  const queryText = `UPDATE "user" SET name=$1, password=$2, email=$3, role=$4, group_id=$5, disabled=$6`;
  pool
    .query(queryText, [name, password, email, role, groupid, disabled])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
