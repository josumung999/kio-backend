const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose')

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
  
  try {
    // get the authenticated user informations
    const user = await User.findById(req.user.id).select('-password');
    
    // create a new transaction instance to be saved in database
    let newTransaction = new Transaction({
      userId: req.user.id,
      ref: user.email,
      transactionType: req.body.transactionType,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      description: req.body.description,
    });

    // declare the variable balance
    let newUserBalance = 0;
  
    // check the type of transaction
    // if transaction is deposit we add amount to balance
    if (newTransaction.transactionType === "DEPOSIT") {
      // user.balance = user.balance + transaction.amount
      newUserBalance = user.balance + newTransaction.amount;

      // Save the newBalance in user model
      await user.updateOne({ balance: newUserBalance });

      // save the transaction to the database
      const transaction = await newTransaction.save();
      // return success with transaction details
      return res.status(200).json(transaction);
    } else {
      // else
      if (user.balance < newTransaction.amount) {
        // check if user.balance < transaction.amount
        // if true
          // raise an error ('Balance insuffisante')
        return res.status(400).json({ msg: "Balance insuffisante" })
      } else {
        // else
          // user.balance = user.balance - transaction.amount
        newUserBalance = user.balance - newTransaction.amount;

        await user.updateOne({ balance: newUserBalance });


        // save the transaction to the database
        const transaction = await newTransaction.save();
        // return success with transaction details
        return res.status(200).json(transaction);
      }
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' })
  }
});


// @route GET api/transactions
// @desc get all transactions
// @access PRIVATE

router.get('/', auth, async (req, res) => {

  // get authenticated user informations
  const user = await User.findById(req.user.id).select('-password');

  // this one is for getting all transactions
  try {
    let transactions = {};
    if (user.role === "admin") {
      transactions = await Transaction.find();
    } else {
      transactions = await Transaction.find({ userId: req.user.id });
    }

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});


module.exports = router;