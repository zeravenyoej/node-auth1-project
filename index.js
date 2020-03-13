const express = require("express")
const helmet = require("helmet")
const authRoutes = require("./auth/auth-router")
const usersRoutes = require("./users/users-routes")
const session = require('express-session')

const server = express()
const PORT = 2000

const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}

server.use(helmet())
server.use(express.json())
server.use(session(sessionConfig))

server.use('/api', authRoutes)
server.use('/api/users', usersRoutes)

server.use((err, req, res, next) => {
    console.log( "Here's the error: ", err)
    res.status(500).json("Something went wrong")
})

server.listen(PORT, console.log(`Server is running on port ${PORT}`))