const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/all", rejectUnauthenticated, (req, res) => {
  // GET all participants matching user's group
  console.log('in /all with user:', req.user);
  const groupId = req.user.group_id;
  const queryText = `SELECT * FROM participant WHERE group_id=$1`;
  pool
    .query(queryText, [groupId])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});
/**
 * POST route template
 */
router.post("/new", (req, res) => {
  // POST new participants
  console.log("in post", req.body);
  const queryText = `INSERT INTO participant (name, gender, birthdate, height, weight) VALUES ($1, $2, $3, $4, $5) `;
  pool
    .query(queryText, [
      req.body.name,
      req.body.gender,
      req.body.birthdate,
      req.body.height,
      req.body.weight,
    ])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});

/**
 * PUT route template
 */
router.post("/update", (req, res) => {
  // Update participant info
  console.log("in post", req.body);
  const queryText = `UPDATE participant SET name=$2, gender=$3, birthdate = $4, height=$5, weight=$6 WHERE id= $1`;
  pool
    .query(queryText, [
      req.body.id,
      req.body.name,
      req.body.gender,
      req.body.birthdate,
      req.body.height,
      req.body.weight,
    ])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});

module.exports = router;
