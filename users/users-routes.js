const express = require("express")
const router = express.Router()
const Users = require('./users-model')

//get all 
router.get('/', async (req, res, next) => {
    try {
        res.json(await Users.findAll())
    } catch(err) {
        next(err)
    }
})

//get by id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        res.json(await Users.findById(id))
    } catch(err) {
        next(err)
    }
})



module.exports = router