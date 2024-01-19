// import express
const express = require('express')

// import controller
const coursesRoutes = require('./../controllers/courses-controller.js')

// create router
// in server.js, this route is specified as '/courses'
const router = express.Router()

// add route for GET request to retrieve everything in table
router.get('/all', coursesRoutes.getAllCourses)

// add route for POST request to create record
router.post('/create', coursesRoutes.createCourse)

// add route for PUT request to delete specific course
router.put('/delete', coursesRoutes.deleteCourse)

// add route for PUT request to reset table to empty
router.put('/reset', coursesRoutes.resetCourses)

// Export router
module.exports = router