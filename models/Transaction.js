const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  },
  ref: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['DEPOSIT', 'TRANSFER', 'PAYMENT', 'WITHDRAWAL', 'RECHARGE'],
    default: 'DEPOSIT',
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['AGENT', 'MOBILE MONEY', 'WAARI', 'BANK', 'CREDIT CARD', 'WORLD REMIT', 'SYSTEM'],
    default: 'AGENT',
  },
  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    default: 'SUCCESS'
  },
  description: {
    type: String,
    required: true,
  }
}, 
{
  timestamps: true,
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);