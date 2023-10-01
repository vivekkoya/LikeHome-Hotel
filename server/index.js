const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// Basic app get request for info
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Request for all hotels 
app.get('/hotel', (req, res) => {
    res.send('Hotels Information')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))