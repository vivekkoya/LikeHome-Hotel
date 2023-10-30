const mongoose = require('mongoose');
const Listing = mongoose.model('Listing');

async function filter(city, priceMin, priceMax, beds, people, amenities, accessibility) {
  try {
    const query = {
      'location.city': city,
    };

    if (priceMin || priceMax) {
      filter.price = {};
      if(priceMin) {
        filter.price.$gte = parseInt(priceMin);
      }
      if (priceMax) {
        filter.price.$lte = parseInt(priceMax);
      }
    }

    if (beds) {
      filter['room_details.beds'] = beds;
    }

    if (people) {
      filter['room_details.max_people'] = maxPeople;
    }

    if (amenities) {
      filter.amenities = {$all: amenities};
    }

    if (accessibility) {
      filter.accessibility = {$all: accessibility};
    }

    const hotels = await Listing.find(query);

    return hotels;
  } catch(error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
}