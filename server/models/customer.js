const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var customerSchema = mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  phone: String,
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },

});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = {
  Customer
}
