const express = require("express")
const router = express.Router()
const userHelper = require('./users-model')

//get all 
router.get('/', async (req, res, next) => {
    try {
        

    } catch(err) {
        next(err)
    }
})

//get by id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

    } catch(err) {
        next(err)
    }
})

//create
router.post('/', async (req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
})




module.exports = router