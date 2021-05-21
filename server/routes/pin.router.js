const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log("in pin router with:", req.user);
  const userGroup = req.user.group_id;
  const queryText = `SELECT pin_number FROM pins WHERE group_id=$1`;
  pool
    .query(queryText, [userGroup])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
