const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/all', (req, res) => {
    // GET all participants
      const queryText = `SELECT * FROM participant`
      pool.query(queryText).then((response) => {
          res.send(response.rows)
      }).catch((err) => {
          res.sendStatus(500)
          console.log(err)
      })
  });
/**
 * POST route template
 */
router.post('/new', (req, res) => {
    // POST new participants
    console.log('in post', req.body)
    const queryText = `INSERT INTO participant (name, gender, birthdate, height, weight) VALUES ($1, $2, $3, $4, $5) `
    pool.query(queryText, [req.body.name, req.body.gender, req.body.birthdate, req.body.height, req.body.weight]).then((response) => {
        res.sendStatus(201)
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
});



module.exports = router;
