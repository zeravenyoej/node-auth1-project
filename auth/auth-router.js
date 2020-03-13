const express = require("express")
const Users = require('../users/users-model')
const doesUserExist = require('../middleware/doesUserExist')
// const restrict = require('../middleware/restrict')
const bcrypt = require("bcryptjs")

const router = express.Router()

//register a new user
router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()

        if (user) {
            return res.status(409).json({message: "Username is already taken"})
        } 
        
        if (!password) {
            return res.status(400).json({message: "Please provide a password"})
        }

        const newUser = await Users.createUser(req.body)
        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
})


// login user
router.post('/login', doesUserExist(), async (req, res, next) => {
    try {
        const { username, password } = req.body
        const isPasswordValid = await bcrypt.compare(password, req.dbUser.password)
    
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"})
        }

        res.json({message: `Welcome ${username}!`})
    } catch(err) {
        console.log("ERROR: ", err)
        next(err)
    }
})

module.exports = router