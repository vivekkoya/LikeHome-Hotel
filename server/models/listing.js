import mongoose, { trusted } from 'mongoose';

const roomSchema = mongoose.Schema({
    beds: {
        type: Number,
        required: true
    },
    max_people: {
        type: Number,
        required: true
    }, 
    type: {
        type: String,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
})

const locationSchema = mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const postSchema = mongoose.Schema({
    hotel_name: { 
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: locationSchema,
        required: true
    },
    room_details: {
        type: roomSchema,
        required: true
    },
    amenities: [String],
    accessability: [String],
    check_in: {
        type: String,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Regex pattern for validating the time format
        default: '17:00'
    },
    check_out: {
        type: String,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Regex pattern for validating the time format
        default: '11:00'
    },
    imgurl: [String]

})

const Listing = mongoose.model('Listing', postSchema)
export default Listing 