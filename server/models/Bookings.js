import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },

  lisitng: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    required: true
  },

  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    requred: true
  },

  guests: {
    type: Number,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking