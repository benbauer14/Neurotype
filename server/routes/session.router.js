const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
 router.get('/all', rejectUnauthenticated, (req, res) => {
    // GET all participants
      const queryText = `SELECT session.id, session.time, session.notes, session.user_id, session.participant_id, session.group_id, users.name AS researchername, researchgroup.name AS researchgroup, participant.name AS participantname, surveyraw.csvlocation, eegraw.run FROM session
      JOIN users ON session.user_id = users.id
      JOIN researchgroup ON session.group_id = researchgroup.id
      JOIN participant ON session.participant_id = participant.id
      LEFT JOIN surveyraw ON session.id = surveyraw.session_id
      LEFT JOIN eegraw ON session.id = eegraw.session_id
      ORDER BY session.id`
      pool.query(queryText).then((response) => {
          res.send(response.rows)
      }).catch((err) => {
          res.sendStatus(500)
          console.log(err)
      })
  });

  router.get('/groupid', rejectUnauthenticated, (req, res) => {
    // GET all participants
    const queryText = `SELECT session.id, session.time, session.notes, session.user_id, session.participant_id, session.group_id, users.name AS researchername, researchgroup.name AS researchgroup, participant.name AS participantname, surveyraw.csvlocation, eegraw.run FROM session
    JOIN users ON session.user_id = users.id
    JOIN researchgroup ON session.group_id = researchgroup.id
    JOIN participant ON session.participant_id = participant.id
    LEFT JOIN surveyraw ON session.id = surveyraw.session_id
    LEFT JOIN eegraw ON session.id = eegraw.session_id WHERE session.group_id=$1 
    ORDER BY session.id`
      pool.query(queryText, [req.query.gid]).then((response) => {
          res.send(response.rows)
      }).catch((err) => {
          res.sendStatus(500)
          console.log(err)
      })
  });

  router.get('/participant', rejectUnauthenticated, (req, res) => {
    // GET unique participants
      const queryText = `SELECT session.id, session.time, session.notes, session.user_id, session.participant_id, session.group_id FROM session JOIN participant ON session.participant_id = participant.id WHERE participant.name = $1`
      pool.query(queryText, [req.query.p]).then((response) => {
          res.send(response.rows)
      }).catch((err) => {
          res.sendStatus(500)
          console.log(err)
      })
  });

  router.post('/new', (req, res) => {
    // POST new participants
    console.log('in post', req.body.participant_name)
    const queryText = `INSERT INTO session (notes, user_id, participant_id, group_id) VALUES ($1, $2, $3, $4) RETURNING id`
    pool.query(queryText, [req.body.notes, req.body.user_id, req.body.participant_id, req.body.group_id]).then((response) => {
        const newResponse = {}
        newResponse['id'] = response.rows[0].id
        newResponse['participant_name'] = req.body.participant_name
        res.send(newResponse)
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
});

  module.exports = router;