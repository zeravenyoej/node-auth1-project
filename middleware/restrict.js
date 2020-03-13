const Users = require('../users/users-model')
const bcrypt = require("bcryptjs")

function restrict(){
    const authError = {
        message: "You shall not pass!"
    }
    return async (req, res, next) => {
        try {
            //if the user didn't even GIVE this info in their headers
            const { username, password } = req.headers
            if(!username || !password){
                return res.status(401).json({message: "give me info"})
            }

            //If the  usernames don't match
            const user = await Users.findBy({ username }).first()
            if(!user) {
                return res.status(401).json({message: 'invalid username'})
            }

            //If the passwords don't mach
            const passwordValid = await bcrypt.compare(password, user.password)
            if(!passwordValid){
                return res.status(401).json({message: "invalid password"})
            }

            next()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict