const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');

var HotelSchema = Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: "Email address is required",
      unique: [true, "This login is already taken. Please try to use a different one"],
      trim: true
    },

    password: {
      type: String,
      required: "Password is required",
      trim: true,
      minLength: 8,
      maxLength: 32
    }
  }
)

Hotel.plugin(passportLocalMongoose);
module.exports = mongoose.model("Hotel", Hotel);