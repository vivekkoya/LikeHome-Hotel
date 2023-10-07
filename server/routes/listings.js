import express from 'express'

const router = express.Router();

import Listing from '../models/listing.js'

//localhost:5000/lisitngs

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


router.get('/getListings', async (req, res) => {
    try {
        const postListing = await Listing.find().lean()

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



export default router