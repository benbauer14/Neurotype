
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get('/', (req, res) => {
    // GET all groups
    const queryText = `SELECT * FROM "researchgroup"`
    pool.query(queryText).then((response) => {
        res.send(response.rows)
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
  });

module.exports = router;
