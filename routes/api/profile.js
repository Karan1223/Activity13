
const express = require('express')
const router = express.Router()


// Import ShipWreck schema
const User = require('../../models/User')

//@type     -   GET
//@route    -   /api/profile
//@desc     -   Just for testing
//@access   -   PUBLIC
router.get('/', (req, res) => res.send('Profile related routes'))

// get all records. URL : /api/profile/get
router.get('/get-username', async (req, res) => {
    // fetch data from db
    const user = await User.find({})
    try {
        res.status(200).send(user)
    }
    catch {
        res.status(500).send(error)
    }
})


// create a new document. URL : /api/profile/add
router.post('/add-username', (req, res) => {
    // check if username is already in collection.
    User
        .findOne({username: req.body.username})
        .then(user => {
            if (user) {
                res.status(400).send('Username already there.')
            } else {
                
                const user = User({
                    username: req.body.username
                })

                // add new document to the collection.
                user
                    .save()
                    .then(user => res.send('add success'))
                    .catch(err => res.send(err.message))
            }
        })
        .catch(err => res.send(err))
})
module.exports = router