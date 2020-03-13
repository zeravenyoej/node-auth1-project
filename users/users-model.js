const db = require('../data/config')
const bcrypt = require("bcryptjs")

module.exports = {
    findAll,
    findBy,
    findById,
    createUser
}


function findAll(){
    return db("users").select("id", "username")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}

function findById(id){
    return db("users")
        .where({ id })
        .select("id", "username")
        .first()
}


async function createUser(credentials){
    credentials.password = await bcrypt.hash(credentials.password, 12)
    const [id] = await db("users").insert(credentials)
    return findById(id)
}