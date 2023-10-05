const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

import listingRoutes from './routes/listing.js';
app.use('/listings', listingRoutes)

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

//ConnectionUrl: the url mongodb atlas give you to connect to db. PORT: is the port the server will run on
const CONNECTION_URL = 'mongodb+srv://Winson:yptSeHMywBWNWR4G@hotel.pu5yiij.mongodb.net/?retryWrites=true&w=majority'
const PORT = 5001

//Setting up the connection to mongodb atlas
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error))

// Basic app get request for info
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Request for all hotels 
app.get('/hotel', (req, res) => {
    res.send('Hotels Information')
})
