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
  let queryText;
  // if super admin, can view all participants
  console.log(req.user.role)
  if (req.user.role === 'Super Admin') {
    queryText = `SELECT participant.id, participant.name, participant.gender, participant.birthdate, participant.disabled, participant.height, participant.weight, researchgroup.name AS groupName FROM participant JOIN researchgroup ON participant.group_id = researchgroup.id`;
    pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
  } 
  // otherwise, only from group
  else {
    const groupId = req.user.group_id;
    queryText = `SELECT participant.id, participant.name, participant.gender, participant.birthdate, participant.disabled, participant.height, participant.weight, researchgroup.name AS groupName FROM participant JOIN researchgroup ON participant.group_id = researchgroup.id WHERE group_id=$1`;
    pool
    .query(queryText, [groupId])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
  } 
});
/**
 * POST route template
 */
router.post("/new", rejectUnauthenticated, (req, res) => {
  // POST new participants
  console.log("in post", req.body);
  const queryText = `INSERT INTO participant (name, gender, birthdate, height, weight, group_id) VALUES ($1, $2, $3, $4, $5, $6) `;
  pool
    .query(queryText, [
      req.body.name,
      req.body.gender,
      req.body.birthdate,
      req.body.height,
      req.body.weight,
      req.body.group_id
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
router.post("/update", rejectUnauthenticated, (req, res) => {
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
