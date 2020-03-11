const express = require("express")
const userHelper = require('../users/users-model')

const router = express.Router()

//register a new user
router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await userHelper.findBy({username}).first()
        if (user) {
            return res.status(409).json({message: "Username is already taken"})
        } else if (!password) {
            return res.status(400).json({message: "Please provide a password"})
        }

        const newUser = await userHelper.createUser(req.body)
        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
})


// login user
router.post('/', async (req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
})

module.exports = router