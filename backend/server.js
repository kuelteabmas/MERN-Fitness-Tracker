// Import
const express = require('express') // Express web framework
const cors = require('cors') // Cross-origin resource sharing (CORS) -> Connects Express
const mongoose = require('mongoose') // Mongoose will connect us to the mongoDB database
const path = require('path') // Deals with paths

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

require('dotenv').config() // configure environment variables in .env file

// to create the Express server
const app = express()
const port = process.env.PORT || 5000 // 5000 Port

// Middleware 
app.use(cors()) // CORS middleware
app.use(express.json()) // Express middleware to allow us to parse JSON

// MongoDB Connection process
const uri = process.env.ATLAS_URI // MongoDB database URI connection string form mongoDB Atlas -- ATLAS_URI will be stored in .env file
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }) // start connection to db
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

// Routing to respective pages
app.use('/exercises', exercisesRouter) // routes to /exercises page
app.use('/users', usersRouter)// routes to /users page

// Serve if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('build'))

    app.get('*', (req, res) => {
        // load index.html file build/index.html
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})