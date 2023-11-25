import mongoose from 'mongoose';
import Listing from './listing.js';

const HotelSchema = mongoose.Schema({
    // email/username specifications
    email: {
      type: String,
      lowercase: true,
      required: "Email address is required",
      unique: [true, "This login is already taken. Please try to use a different one"],
      trim: true
    },

    // password specifications
    password: {
      type: String,
      required: "Password is required",
      trim: true,
      minLength: 8,
      maxLength: 60
    },

    // determine if user is admin or customer
    isAdmin: {
      type: Boolean,
      default: false
    },

    // listing of all hotel elements
    listings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing'
    }],
    rewards: {
      type: Number,
      default: 0
    }
    
});

const Hotel = mongoose.model('Hotel', HotelSchema);
export default Hotel;