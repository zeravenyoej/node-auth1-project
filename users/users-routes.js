const express = require("express")
const Users = require('./users-model')
const restrict = require('../middleware/restrict')

const router = express.Router()

//get all 
router.get('/', restrict(), async (req, res, next) => {
    try {
        res.json(await Users.findAll())
    } catch(err) {
        next(err)
    }
})

//get by id
router.get('/:id', restrict(), async (req, res, next) => {
    try {
        const { id } = req.params
        res.json(await Users.findById(id))
    } catch(err) {
        next(err)
    }
})



module.exports = router