// import express
const express = require('express')

// import students-controller
const studentRoutes = require('./../controllers/students-controller.js')

// create router
// in server.js, this route is specified as '/students'
const router = express.Router()

// add route for GET request to retrieve everything in table
router.get('/all', studentRoutes.getAllStudents)

// add route for POST request to create record
router.post('/create', studentRoutes.createStudent)

// add route for PUT request to delete specific student
router.put('/delete', studentRoutes.deleteStudent)

// add route for PUT request to reset table to empty
router.put('/reset', studentRoutes.resetStudents)

// Export router
module.exports = router