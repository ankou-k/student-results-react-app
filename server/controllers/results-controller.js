// import database
const knex = require('./../db')

// retrieve all records
exports.getAllRecords = async (req, res) => {
  // get all records from database
  knex
    .select('*') // select all records
    .from('results')
    .then(userData => {
      // send extracted records in response
      res.json(userData)
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error retrieving records: ${err}` })
    })
}

// create new record
exports.createRecord = async (req, res) => {
  // add new record to database
  knex('results')
    .insert({ // insert new record
      'courseName': req.body.courseName,
      'studentName': req.body.studentName,
      'score': req.body.score,
    })
    .then(() => {
      // send a success message in response
      res.json({ message: `Record created.` })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error adding record: ${err}` })
    })
}

// remove specific record
exports.deleteRecord = async (req, res) => {
  // find specific record in the database and remove it
  knex('results')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // send a success message in response
      res.json({ message: `Record deleted.` })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error deleting record: ${err}` })
    })
}

// remove all records in the table
exports.resetRecords = async (req, res) => {
  // remove all records from database
  knex
    .select('*') // select all records
    .from('results')
    .truncate() // delete the selection
    .then(() => {
      // send a success message in response
      res.json({ message: 'Result list cleared.' })
    })
    .catch(err => {
      // send a error message in response
      res.json({ message: `There was an error resetting result list: ${err}.` })
    })
}