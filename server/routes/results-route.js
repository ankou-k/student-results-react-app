// import express
const express = require('express')

// import controller
const resultsRoutes = require('./../controllers/results-controller.js')

// create router
// in server.js, this route is specified as '/results'
const router = express.Router()

// add route for GET request to retrieve everything in table
router.get('/all', resultsRoutes.getAllRecords)

// add route for POST request to create record
router.post('/create', resultsRoutes.createRecord)

// add route for PUT request to delete specific course
router.put('/delete', resultsRoutes.deleteRecord)

// add route for PUT request to reset table to empty
router.put('/reset', resultsRoutes.resetRecords)

// Export router
module.exports = router