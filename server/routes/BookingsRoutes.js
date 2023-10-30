import express from 'express'
const router = express.Router();
import Booking from '../models/Bookings.js';

// Create a new booking
router.post('/', async(req, res) => {
  try {
    const{user, listing, checkInDate, checkOutDate, guests} = req.body;

    const newBooking = new Booking({
      user,
      listing,
      checkInDate,
      checkOutDate,
      guests
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: ' Booking fialed'});
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