// Import path module
const path = require('path')

// get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// mreate a table in the database called "students"
knex.schema
  // make sure no "students" table exists before trying to create new
  .hasTable('students')
    .then((exists) => {
      if (!exists) {
        // if no "students" table exists, create it
        // use "id" as a primary identification increment "id" with every new record 
        return knex.schema.createTable('students', (table)  => {
          table.increments('id').primary()
          table.string('firstName')
          table.string('familyName')
          table.date('birthDate')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Students\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Create a table in the database called "courses"
knex.schema
  // Make sure no "students" table exists before trying to create new
  .hasTable('courses')
    .then((exists) => {
      if (!exists) {
        // if no "courses" table exists, create it
        // use "id" as a primary identification increment "id" with every new record 
        return knex.schema.createTable('courses', (table)  => {
          table.increments('id').primary()
          table.string('courseName')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Courses\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Create a table in the database called "results"
knex.schema
  // Make sure no "results" table exists before trying to create new
  .hasTable('results')
    .then((exists) => {
      if (!exists) {
        // if no "results" table exists, create it
        // use "id" as a primary identification increment "id" with every new record 
        return knex.schema.createTable('results', (table)  => {
          table.increments('id').primary()
          table.string('courseName')
          table.string('studentName')
          table.string('score')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Results\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "students" table
knex.select('*').from('students')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex