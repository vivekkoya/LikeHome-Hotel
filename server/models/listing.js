import mongoose from 'mongoose';

const room_details = mongoose.Schema({
    beds: Number,
    max_people: Number,
    type: String,
    bathrooms: Number,
})

const location = mongoose.Schema({
    state: String,
    city: String,
    address: String,
    zipcode: String
})

const postSchema = mongoose.Schema({
    hotel_name: String,
    price: Number,
    location: location,
    room_details: room_details,
    amenities: [String],
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

const Listing = model('Listing', postSchema)
export default Lisitng 