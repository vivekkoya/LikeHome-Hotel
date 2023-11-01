import express from 'express'
import Booking from '../models/Bookings.js';

const router = express.Router();

// Create a new booking
router.post('/', async(req, res) => {
  console.log(req)
  try {
    const booking = req.body.booking;

    const newBooking = new Booking(booking)

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: ' Booking failed'});
  }
});

// Get a list of all bookings
router.get('/', async(req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to get bookings'});
  }
});

// Cancel a booking
router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({message: 'Booking not found'});
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to cancel booking'});
  }
});

export default router;