import express from 'express'
import Booking from '../models/Bookings.js';

const router = express.Router();

// Create a new booking
router.post('/', async(req, res) => {
  try {
    const{user, listing, checkInDate, checkOutDate, people} = req.body;

    const newBooking = new Booking({
      user,
      listing,
      checkInDate,
      checkOutDate,
      people
    });

    const saveBooking = await newBooking.save();
    res.status(201).json(saveBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Booking fialed'});
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

// Edit a booking
router.put('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const updateBooking = req.body;

    const existingBooking = await Booking.findById(id);

    if (!existingBooking) {
      return res.status(404).json({message: 'Booking not found'});
    }

    Object.assign(existingBooking, updateBooking);

    const savedBooking = await existingBooking.save();

    res.status(200).json(savedBooking);
  } catch (error) {
      console.error(error)
      res.status(500).json({mmessage: 'Failed to edit booking'});
  }
});

// Cancel a booking
router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;

    const deleteBooking = await Booking.findByIdAndDelete(id);

    if (!deleteBooking) {
      return res.status(404).json({message: 'Booking not found'});
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to cancel booking'});
  }
});

export default router;