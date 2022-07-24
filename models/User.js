const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  balanceOnHold: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  }
},
{
  timestamps: true
}
);

module.exports = User = mongoose.model('user', UserSchema);





