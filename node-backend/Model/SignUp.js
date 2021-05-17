const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const validator = require('validator');
const createError = require('http-errors');

let SignUp = new Schema({
  Username: { type: String, required: true },
  FirstName: { type: String },
  LastName: { type: String },
  Email: { type: String, required: true },
  Phone: { type: Number, required: true },
  DOB: { type: Date },
  Role: { type: String },
  Gender: { type: String },
  Password: { type: String, required: true }, //minlength: 8, maxlength: 16, trim: true,
  file: { type: String },
  Date: { type: Date, default: Date.now }
}, {
  collection: 'SignUP'
})

module.exports = mongoose.model('SignUp', SignUp)