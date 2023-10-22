const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./listings.js');

application.use(express.json());

application.get('/hotels', async(req, res) => {
  try {
    const{beds, price, hotelName, amenities, accessabilities} = req.query;
    const query = {};

    if(beds) {
      query['room_details.bed'] = beds;
    }

    if(price) {
      query.price = {$lte: parseInt(price)};
    }

    if(hotelName) {
      query.hotel_name = new RegExp(hotelName, 'i');
    }

    if(amenities) {
      query.amenities = {$all: amenities.split(',')};
    }

    if(accessabilities) {
      query.accessabilities = {$all: accessabilities.split(',')};
    }

    const hotels = await Listing.find(query).exec();

    res.json(hotels);
  } catch(error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
});