import express from 'express'
import Booking from '../models/Bookings.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const booking = req.body.booking;

    const exists = await Booking.findOne({
      user: booking.user,
      $or: [
        {
          $and: [
            { checkInDate: { $lte: booking.checkOutDate } },
            { checkOutDate: { $gt: booking.checkInDate } }
          ]
        },
        {
          $and: [
            { checkInDate: { $lt: booking.checkOutDate } },
            { checkOutDate: { $gte: booking.checkInDate } }
          ]
        }
      ]
    });

    if (exists) {
      const objectJson = exists.toObject(); // Convert to a JSON-serializable object
      return res.status(401).json(objectJson);
    } else {
      const newBooking = new Booking(booking)

      const saveBooking = await newBooking.save();
      return res.status(201).json({message: 'success'});
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json('Internal server error'); // Status code 500 for internal server error
  }
});

// Get a list of all bookings
router.get('/:id', async(req, res) => {
  try {
    const {id} = req.params
    const bookings = await Booking.find({'user': id});
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