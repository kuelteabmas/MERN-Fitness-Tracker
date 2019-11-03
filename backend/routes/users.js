const router = require('express').Router() // Creating route for Users
let User = require('../models/users.model') // Mongoose model

// Handles incoming HTTP GET requests for /users URL
router.route('/').get((req, res) => {
    User.find() // returns User search in URL (returns a Promise)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Handles incoming HTTP POST requests 
router.route('/add').post((req, res) => {
    const username = req.body.username
    const newUser = new User({ username })

newUser.save()
    .then(() => res.json('User added !'))
    .catch(err => res.json(400).json('Error: ' + err))
}) 

module.exports = router