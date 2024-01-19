// import database
const knex = require('./../db')

// retrieve all records
exports.getAllStudents = async (req, res) => {
  // get all records from database
  knex
    .select('*') // select all records
    .from('students')
    .then(userData => {
      // send extracted records in response
      res.json(userData)
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error retrieving students: ${err}` })
    })
}

// create new record
exports.createStudent = async (req, res) => {
  // add new record to database
  knex('students')
    .insert({ // insert new record
      'firstName': req.body.firstName,
      'familyName': req.body.familyName,
      'birthDate': req.body.birthDate,
    })
    .then(() => {
      // send a success message in response
      res.json({ message: `Student ${req.body.firstName} ${req.body.familyName} created.` })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error adding student ${req.body.firstName} ${req.body.familyName}: ${err}` })
    })
}

// update student name
exports.updateStudentName = async (req, res) => {
  // get all students from database
  knex('students')
    .where('id', req.body.id) // find correct record based on id
    .update({
      'firstName': req.body.firstName,
      'familyName': req.body.familyName,
    })
    .then(userData => {
      // send students extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error retrieving students: ${err}` })
    })
}

// remove specific record
exports.deleteStudent = async (req, res) => {
  // find specific record in the database and remove it
  knex('students')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // send a success message in response
      res.json({ message: `Student deleted.` })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error deleting student: ${err}` })
    })
}

// remove all records in the table
exports.resetStudents = async (req, res) => {
  // remove all records from database
  knex
    .select('*') // select all records
    .from('students')
    .truncate() // delete the selection
    .then(() => {
      // send a success message in response
      res.json({ message: 'Student list cleared.' })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error resetting student list: ${err}.` })
    })
}