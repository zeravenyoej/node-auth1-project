const express = require("express")
const helmet = require("helmet")
const authRoutes = require("./auth/auth-router")
const loginRoutes = require('./login/login-routes')


const server = express()
const PORT = 2000

server.use(helmet())
server.use(express.json())

server.use('/api', authRoutes)
server.use('/api/users', usersRoutes)

server.use((err, req, res, next) => {
    console.log( "Here's the error: ", err)
    res.status(500).json("Something went wrong")
})

server.listen(PORT, console.log(`Server is running on port ${PORT}`))