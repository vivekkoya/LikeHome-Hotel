const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./listings.js');
const router = express.Router();

router.get('/hotels', async(req, res) => {
  try {
    const{beds, priceMin, priceMax, hotelName, amenities, accessability} = req.query;
    const filter = {};

    if(beds) {
      filter['room_details.bed'] = {$gte: parseInt(beds)};
    }

    if(priceMin || priceMax) {
      filter.price = {};
      if(priceMin) {
        filter.price.$gte = parseInt(priceMin);
      }
      if(priceMax) {
        filter.price.$lte = parseInt(priceMax);
      }
    }

    if(hotelName) {
      filter.hotel_name = new RegExp(hotelName, 'i');
    }

    if(amenities) {
      filter.amenities = {$all: amenities.split(',')};
    }

    if(accessability) {
      filter.accessability = {$in: accessability.split(',')};
    }

    const hotels = await Listing.find(filter);

    res.json(hotels);
  } catch(error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
});

module.exports = router;