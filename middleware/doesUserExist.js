const Users = require('../users/users-model')

function doesUserExist(){

    return async (req, res, next) => {
        try {
            const { username } = req.body
            const user = await Users.findBy({ username }).first()

            if(!user){
                return res.status(400).json({message: "User does not exist"})
            }

            req.dbUser = user
            next()

        } catch(err){
            next(err)
        }
    }
}

module.exports = doesUserExist