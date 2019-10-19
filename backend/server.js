const express = require('express')
const cors = require('cors')

require('dotenv').config() // configure environment variables in .env file

// to create the Express server
const app = express()
const port = process.env.PORT || 5000 // 5000 Port

// Middleware 
app.use(cors()) // CORS middleware
app.use(express.json()) // Express middleware to allow us to parse JSON

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})