const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
 router.post('/new', (req, res) => {
    // POST new survey results
    console.log('in post', req.body.jsondata)
    const queryText = `INSERT INTO surveyraw (json, session_id, csvlocation) VALUES ($1, $2, $3) RETURNING id`
    pool.query(queryText, [req.body.jsondata, req.body.session_id, req.body.csvlocation]).then((response) => {
        res.sendStatus(201)
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
 })

module.exports = router;
