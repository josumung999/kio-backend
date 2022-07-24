const express = require('express');
const router = express.Router();



// @route GET api/transactions
// @desc Test route for transactions
// @access PUBLIC
router.get('/', (req, res) => {
  res.send('Transactions Route')
});


module.exports = router;