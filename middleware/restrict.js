// from our manual session implementation
// **********************************************
// const Users = require('../users/users-model')
// const bcrypt = require("bcryptjs")

// const sessions = {}

module.exports = function restrict(){

    return (req, res, next) => {
        try {
//      our manual session implementation
//      **********************************************
// 			const { cookie } = req.headers
// 			if (!cookie) {
// 				return res.status(401).json(authError)
// 			}
// 
// 			const authToken = cookie.replace("token=", "")
// 			if (!sessions[authToken]) {
// 				return res.status(401).json(authError)
// 			}

			// we set `req.session.user` when the user is authenticated in `/login`.
			// so we know if it's not set, the user isn't authenticated yet.

            if (!req.session || !req.session.user) {
                return res.status(401).json({message: "You shall not pass!"})
            }

            next()
        } catch(err) {
            next(err)
        }
    }
}

//module.exports = restrict