// import database
const knex = require('./../db')

// retrieve all records
exports.getAllCourses = async (req, res) => {
  // get all records from database
  knex
    .select('*') // select all records
    .from('courses')
    .then(userData => {
      // send extracted records in response
      res.json(userData)
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error retrieving courses: ${err}` })
    })
}

// create new record
exports.createCourse = async (req, res) => {
  // add new record to database
  knex('courses')
    .insert({ // insert new record
      'courseName': req.body.courseName,
    })
    .then(() => {
      // send a success message in response
      res.json({ message: `Course ${req.body.courseName} created.` })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error adding course ${req.body.courseName}: ${err}` })
    })
}

// update course gradesPosted
exports.updateGradesPosted = async (req, res) => {
    let newAmount = req.body.currentAmountPosted - req.body.change;
    newAmount = ((newAmount < 0) ? 0 : newAmount);
    // get all coursesfrom database
    knex('courses')
        .where('id', req.body.id) // find correct record based on id
        .update({
        'gradesPosted': newAmount,
        })
        .then(userData => {
        // send courses extracted from database in response
        res.json(userData)
        })
        .catch(err => {
        // send a error message in response
        res.json({ message: `There was an error retrieving courses: ${err}` })
        })
}

// remove specific record
exports.deleteCourse = async (req, res) => {
  // find specific record in the database and remove it
  knex('courses')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // send a success message in response
      res.json({ message: `Course deleted.` })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error deleting course: ${err}` })
    })
}

// remove all records in the table
exports.resetCourses = async (req, res) => {
  // remove all records from database
  knex
    .select('*') // select all records
    .from('courses')
    .truncate() // delete the selection
    .then(() => {
      // send a success message in response
      res.json({ message: 'Course list cleared.' })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error resetting course list: ${err}.` })
    })
}