import express from 'express';
import Listing from '../models/listing.js';

const router = express.Router();

//localhost:5001/listngs

router.get('/', (req, res) => {
    try {

    } catch (error) {

    }
})

// Create a new listing
router.post('/createListing', async (req, res) => {
    try {
        const listingData = req.body;
        const newListing = new Listing(listingData);
        await newListing.save();
        res.status(201).json(newListing)
    } catch (error) {
        res.status(404).json({messages: error.message })
    }
})

// Get listings
router.get('/getListings/:id', async (req, res) => {
    try {
        const postListing = await Listing.findById({'_id':req.params.id}).lean();

        console.log(postListing);

        res.status(200).json(postListing);

    } catch (error) {
        res.status(404).json({messages: error.message });
    }
})

// Delete a listing
router.delete('/deleteListing/:listingId', async (req ,res) => {
    try {
        const listingId = req.params.listingId;

        console.log(listingId);

        const deletedListing = await Listing.findByIdAndRemove(listingId);

        if (!deletedListing) {
            throw new Error(`Listing not found`);
        }
        res.status(200).json({message: "Listing succesfully deleted"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

// Note for multiword cities like san jose use %20 instead of space 
// ex localhost:5001/listings/ListingInCity/San%20Jose
// Incorporated filtering hotels
router.post('/ListingInCity/:city', async (req, res) => {
    try {
        const city = req.params.city
        const {priceMin, priceMax, beds, people, amenities, accessability, sortBy} = req.body;
        const query = {'location.city': city};
        console.log(req.body)
        
        if (priceMin && !isNaN(priceMin)) {
            query['price'] = {$gte: parseInt(priceMin)};
        }
        if (priceMax && !isNaN(priceMax)) {
            query['price'] = query['price'] || {};
            query['price']['$lte'] = parseInt(priceMax);
        }

        if (beds) {
            query['room_details.beds'] = {$gte: parseInt(beds)};
        }

        if (people) {
            query['room_details.max_people'] = {$gte: parseInt(people)};
        }

        if (amenities && amenities.length !== 0) {
            query['amenities'] = {$in: amenities};
        }

        if (accessability && accessability.length !== 0) {
            query['accessability'] = {$in: accessability};
        }

        let sortOptions = {};
        switch (sortBy) {
            case 'priceAsc':
                sortOptions = {price: 1};
                break;
            case 'priceDesc':
                sortOptions = {price: -1};
                break;
            case 'bedsAsc':
                sortOptions = {'room_details.beds': 1};
                break;
            case 'bedsDesc':
                sortOptions = {'room_details.beds': -1};
                break;
            case 'peopleAsc':
                sortOptions = {'room_details.max_people': 1};
                break;
            case 'peopleDesc':
                sortOptions = {'room_details.max_people': -1};
                break;
            default:
                sortOptions = {price: 1};
        }

        const sortedListings = await Listing.find(query).sort(sortOptions).lean();
        console.log(sortedListings)

        res.status(200).json(sortedListings);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message});
    }
})


export default router