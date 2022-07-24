const express = require('express');
const router = express.Router();



// @route GET api/users
// @desc Get all the users
// @access PUBLIC
router.get('/', (req, res) => {
  res.send('User Route')
});