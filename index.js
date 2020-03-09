const express = require("express")
const helmet = require("helmet")
const registerRoutes = require('./register/register-routes')
const usersRoutes = require('./users/users-routes')
const loginRoutes = require('./login/login-routes')


const server = express()
const PORT = 2000

server.use(helmet())
server.use(express.json())

server.use('/api/register', registerRoutes)
server.use('/api/users', usersRoutes)
server.use('/api/login', loginRoutes)

server.use((err, req, res, next) => {
    console.log( "Here's the error: ", err)
    res.status(500).json("Something went wrong")
})

server.listen(PORT, console.log(`Server is running on port ${PORT}`))