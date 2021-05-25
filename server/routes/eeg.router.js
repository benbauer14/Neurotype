const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

 router.post('/new', (req, res) => {
    // POST new survey results
    console.log('in post', req.body.jsondata)
    const queryText = `INSERT INTO eegraw (run, json, session_id) VALUES ($1, $2, $3)`
    pool.query(queryText, [req.body.run, req.body.json, req.body.session_id]).then((response) => {
        res.sendStatus(201)
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
 })

module.exports = router;
