const express = require("express")
const Users = require('../users/users-model')
const doesUserExist = require('../middleware/doesUserExist')
const restrict = require('../middleware/restrict')
const bcrypt = require("bcryptjs")

const router = express.Router()

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


router.post('/login', doesUserExist(), async (req, res, next) => {
    try {
        const { username, password } = req.body
        const isPasswordValid = await bcrypt.compare(password, req.dbUser.password)
    
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid password"})
        }

//      our manual session implementation
//      **********************************************
// 		const authToken = Math.random()
// 		sessions[authToken] = user.id
// 
// 		// res.setHeader("Authorization", authToken)
// 		res.setHeader("Set-Cookie", `token=${authToken}; Path=/`)

		// express-session does the above for us
        req.session.user = req.dbUser
        res.json({message: `Welcome ${username}!`})
    } catch(err) {
        console.log("ERROR: ", err)
        next(err)
    }
})

router.get("/logout", restrict(), (req, res, next) => {
    // this will delete the session in the database and try to expire the cookie,
	// though it's ultimately up to the client if they delete the cookie or not.
	// but it becomes useless to them once the session is deleted server-side.
    try {
        req.session.destroy((err) => {
            if(err){
                next(err)
            } else {
                res.json({message: "Successfully logged out"})
            }
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router