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
router.post('/', [
  auth,
  [
    check('transactionType')
      .isIn(['DEPOSIT', 'TRANSFER', 'PAYMENT', 'WITHDRAWAL', 'RECHARGE']).withMessage('Type de transaction invalide'),
    check('amount', 'Veuillez spécifier le montant de la transaction').not().isEmpty(),
    check('paymentMethod', 'Mode de paiement invalide')
      .isIn(['AGENT', 'MOBILE MONEY', 'WAARI', 'BANK', 'CREDIT CARD', 'WORLD REMIT', 'SYSTEM']),
    check('description', 'Description de la transaction requise').not().isEmpty()
  ]
],  async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // get the authenticated user informations

  // create a new transaction instance

  // check the type of transaction

    // if transaction is deposit
      // user.balance = user.balance + transaction.amount
    // else
      // check if user.balance < transaction.amount
        // if true
          // raise an error ('Balance insuffisante')
        // else
          // user.balance = user.balance - transaction.amount
  // update the user with new balance
  // save the transaction to the database
  
  // return success with transaction details

  res.send('Transactions Route')
});


module.exports = router;