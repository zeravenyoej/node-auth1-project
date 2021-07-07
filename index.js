const express = require("express")
const helmet = require("helmet")
const authRoutes = require("./auth/auth-router")
const usersRoutes = require("./users/users-routes")
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session)
const dbConfig = require("./data/config")

const server = express()
const PORT = 2000

server.use(helmet())
server.use(express.json())
server.use(session({
    name: "token", //overwrites the default cookie name, hides our stack better
    secure: false, 
    resave: false, //avoid recreating sessions that have not changes
    saveUninitialized: false, //GDPR laws against setting cookies automatically 
    secret: process.env.COOKIE_SECRET || "secret", // cryptographically sign the cookie
    cookie: {
        httpOnly: true, //disallow javascript from reading our cookie contents        
    //     maxAge: 15 * 1000, //expire the cookie after 15 seconds
    },
    store: new KnexSessionStore({
        createTable: true, //if the session table doesn't exist, create it automatically
        knex: dbConfig, //configured instance of knex
        clearInterval: 1000 * 60 * 15
    }),
}))

server.use('/api', authRoutes)
server.use('/api/users', usersRoutes)

server.use((err, req, res, next) => {
    console.log( "Here's the error: ", err)
    res.status(500).json("Something went wrong")
})

server.listen(PORT, console.log(`Server is running on port ${PORT}`))