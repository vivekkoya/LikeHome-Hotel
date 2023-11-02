import express from 'express'

const router = express.Router();

import Listing from '../models/listing.js'

//localhost:5001/listngs

router.get('/', (req, res) => {
    try {

    } catch (error) {

    }
})


router.get('/createListing', async (req, res) => {
    const listing = req.body
    const newLisitng = new Listing(listing)
    try {
        await newLisitng.save();

        res.status(201).json(newLisitng)
    } catch (error) {
        res.status(409).json( { message: error.message })
    }
})


router.get('/getListings/:id', async (req, res) => {
    try {
        const postListing = await Listing.find({'_id': req.params.id}).lean()

        console.log(postListing)

        res.status(200).json(postListing);

    } catch (error) {
        res.status(404).json({messages: error.message })
    }
})

router.delete('/deleteListing/:listingId', async (req ,res) => {
    const listingId = req.params.listingId;
    
    try {
        console.log(listingId)
        const deletedListing = await Listing.findByIdAndRemove(listingId)

        if (!deletedListing) {
            throw new Error(`Listing not found`)
        }
        res.status(200).json({message: "Listing succesfully deleted"})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

//Note for multiword cities like san jose use %20 instead of space 
// ex localhost:5001/listings/ListingInCity/San%20Jose
// Incorporated filtering hotels
router.get('/ListingInCity/:city', async (req, res) => {
    console.log(req.params.city)
    const city = req.params.city
    const {priceMin, priceMax, beds, people, amenities, accessibility} = req.query;
    const query = {'location.city': city};
    
    if (priceMin) {
        query['price'] = {$gte: parseInt(priceMin)};
    }

    if (priceMax) {
        if (!query['price']) {
            query['price'] = {};
        }
        query['price']['$lte'] = parseInt(priceMax);
    }

    if (beds) {
        query['room_details.bed'] = beds;
    }

    if (people) {
        query['room_details.max_people'] = people;
    }

    if (amenities) {
        query['amenities'] = {$all: amenities.split(',')};
    }

    if (accessibility) {
        query['accessibility'] = {$all: accessibility.split(',')};
    }

    try {
        // const listing = await Listing.find({ 'location.city': city }).lean();
        // res.status(200).json(listing)
        const filteredListings = await Listing.find(query).lean();
        res.status(200).json(filteredListings);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})



export default router