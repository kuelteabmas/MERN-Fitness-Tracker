const router = require('express').Router() // Creating route for Exercises
let Exercise = require('../models/exercises.model') // Mongoose model

// Handles incoming HTTP GET requests for /exercises URL
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Handles incoming HTTP POST requests 
router.route('/add').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Data.parse(req.body.date)

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
    .then(() => res.json('Exercise added !'))
    .catch(err => res.status(400).json('Error = ' + err))
})

module.exports = router