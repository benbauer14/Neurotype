
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

  router.post('/new', (req, res) => {
    // GET all groups
    const queryText = `INSERT INTO "researchgroup" (name, description) VALUES ($1, $2) RETURNING id`
    pool.query(queryText, [req.body.name, req.body.description]).then((response) => {
        const newGroup = response.rows[0].id
        const PINqueryText = `INSERT INTO "pins" (pin_number, group_id) VALUES ($1, $2) `
        pool.query(PINqueryText, [req.body.PIN, newGroup]).then((response) => {
            res.sendStatus(201)
        }).catch((err) => {
            res.sendStatus(500)
            console.log(err)
        })
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
  });


module.exports = router;
