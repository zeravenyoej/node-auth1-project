const Users = require('../users/users-model')

function doesUserExist(){

    return async (req, res, next) => {
        try {
            const { username } = req.body
            const user = await Users.findBy({ username }).first()

            if(user){
                return next()
            }

            res.status(400).json({message: "User does not exist"})
        } catch(err){
            next(err)
        }
    }
}

module.exports = doesUserExist