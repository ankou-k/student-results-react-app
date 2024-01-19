// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// import routes
const studentsRouter = require('./routes/students-route')
const coursesRouter = require('./routes/courses-route')
const resultsRouter = require('./routes/results-route')

// set default port for express app
const PORT = process.env.PORT || 4001

// create express app
const app = express()

// apply middleware (done before routes)
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// implement students route
app.use('/students', studentsRouter)

// implement courses route
app.use('/courses', coursesRouter)

// implement results route
app.use('/results', resultsRouter)

// implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})