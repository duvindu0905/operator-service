const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
  operatorId: {
    type: Number,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  passWord: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  nic: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
  }
}, { timestamps: true });

module.exports = mongoose.model('Operator', operatorSchema);
