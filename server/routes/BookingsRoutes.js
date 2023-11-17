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

// Get a list of past and present bookings
router.get('/:id', async(req, res) => {
  try {
    const {id} = req.params
    const currentDate = new Date();

    const presentBookings = await Booking.find({
      user: id,
      checkOutDate: {$gte: currentDate},
    });

    const pastBookings = await Booking.find({
      user: id,
      checkOutDate: {$lt: currentDate},
    });

    res.status(200).json({
      presentBookings,
      pastBookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'failed to get booking'});
  }
});

// Edit a booking
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateBooking = req.body;
    console.log(updateBooking)

    // Validate updateBooking here if needed

    const existingBooking = await Booking.findById(id);
    console.log(existingBooking)

     if (!existingBooking) {
       return res.status(404).json({ message: 'Booking not found' });
     }

     // Update existingBooking properties
     Object.assign(existingBooking, updateBooking);

     // Save the updated booking
     const savedBooking = await existingBooking.save();

     res.status(200).json(savedBooking);
  } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Failed to edit booking', error: error.message });
  }
});


// Cancel a booking
router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    console.log(id)

    const deleteBooking = await Booking.findByIdAndDelete(id);

    if (!deleteBooking) {
      return res.status(404).json({message: 'Booking not found'});
    }

    res.status(204).end();
  } catch (error) {
      console.error(error);
      res.status(500).json({message: error});
  }
});

export default router;