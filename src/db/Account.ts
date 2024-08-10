const mongoose = require('mongoose');

import { model } from 'mongoose';

const accountSchema = new mongoose.Schema({
  owner_name: {
    type: String,
    required: true
  },
  owner_cpf: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  }
});

const Account = model('Account', accountSchema);
export default Account;