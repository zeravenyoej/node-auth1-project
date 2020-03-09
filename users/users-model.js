const db = require('../data/config')

module.exports = {
    findAll,
    findById,
    createUser
}


function findAll(){
    return db("")
}

function findById(id){
    return db("").where()
}

function createRegister(credentials){
    return db("").insert(credentials)
}