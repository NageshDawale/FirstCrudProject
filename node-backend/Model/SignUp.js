const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const validator = require('validator');
const createError = require('http-errors');

let SignUp = new Schema({
  Username: { type: String, trim: true, required: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },

  Email: { type: String },     
  Phone:  { type: Number}, 

  // phone: {
  //   type: String,
  //   validate: {
  //     validator: function(v) {
  //       return /\d{3}-\d{3}-\d{4}/.test(v);
  //     },
  //     message: props => `${props.value} is not a valid phone number!`
  //   },
  //   required: [true, 'User phone number required']
  // },


  DOB: { type: Date },
  UserId: { type: String },
  Gender: { type: String },
  Password: { type: String, required: true }, //minlength: 8, maxlength: 16, trim: true,
  //verifyPassword: { type: String }
}, {
  collection: 'SignUP'
})
 
module.exports = mongoose.model('SignUp', SignUp)