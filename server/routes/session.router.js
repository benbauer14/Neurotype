const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/all', (req, res) => {
    // GET all participants
      const queryText = `SELECT * FROM session`
      pool.query(queryText).then((response) => {
          res.send(response.rows)
      }).catch((err) => {
          res.sendStatus(500)
          console.log(err)
      })
  });

  module.exports = router;