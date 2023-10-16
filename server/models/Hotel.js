import mongoose from 'mongoose';
import Listing from './listing.js';

const HotelSchema = mongoose.Schema({
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
      maxLength: 60
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    listings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
    }]
});

const Hotel = mongoose.model('Hotel', HotelSchema);
export default Hotel;