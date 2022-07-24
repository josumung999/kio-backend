const express = require('express');
const router = express.Router();



// @route POST api/users
// @desc Register new user
// @access PUBLIC
router.post('/', (req, res) => {

  // testing the route
  console.log(req.body);


  res.send("User route");
});


module.exports = router;