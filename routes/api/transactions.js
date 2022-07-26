const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Import auth middleware
const auth = require('../../middleware/auth');

// Import models
const User = require('../../models/User');
const Transaction = require('../../models/Transaction')




// @route POST api/transactions
// @desc create a new transaction
// @access PRIVATE
router.get('/', auth, (req, res) => {
  res.send('Transactions Route')
});


module.exports = router;