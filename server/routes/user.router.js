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
  console.log('in /register POST req.body:', req.body);
  const name = req.body.name;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const role = req.body.role;

  const group_id = req.body.group_id;

  console.log(name, email)
  const queryText = `INSERT INTO "users" (email, name, password, role, group_id )
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [email, name, password, role, group_id])

    .then(() => {
      console.log("success")
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/register/update', (req, res, next) => {
  console.log(req.body)
  const name = req.body.name;
  console.log(name)
  // const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const role = req.body.role;
  const disabled = req.body.disabled
  const id = req.body.id
  const group = Number.parseInt(req.body.group_id)
  

  const queryText = `UPDATE "users" SET name=$1, email=$2, role=$3, group_id=$4 WHERE id=$5`;
  pool
    .query(queryText, [name, email, role, group, id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/disable', (req, res) => {
  // const disabled = !req.body.disabled
  // let toggleDisable = ''
  console.log(req.body);
  if(req.body.disabled === true){
    const toggleDisable = 'FALSE'
    const queryText = `UPDATE "users" SET "disabled"=$1 WHERE "id"=$2`;
    pool.query(queryText, [toggleDisable, req.body.id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
    console.log('User disable failed: ', err);
    res.sendStatus(500);
  })
  } else if (req.body.disabled === false){
    const toggleDisable = 'TRUE'
    const queryText = `UPDATE "users" SET "disabled"=$1 WHERE "id"=$2`;
    pool.query(queryText, [toggleDisable, req.body.id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
    console.log('User disable failed: ', err);
    res.sendStatus(500);
  })
  }
  // const queryText = `UPDATE "users" SET "disabled"=$1 WHERE "id"=$2`;
  // pool.query(queryText, [toggleDisable, req.body.id])
  // .then(() => res.sendStatus(201))
  // .catch((err) => {
  //   console.log('User disable failed: ', err);
  //   res.sendStatus(500);
  // })
})

router.get('/register/users', (req, res) => {
  // GET all users, do not respond with password or group id
    const queryText = `SELECT id, name, email, role, disabled, group_id FROM "users"`
    pool.query(queryText).then((response) => {
        res.send(response.rows)
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
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
