let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let cat = require('./router/cat')
let mongoose = require('mongoose')

    // Use native promises
mongoose.Promise = global.Promise
let port = 1234
let connection = 'mongodb://localhost:27017/MyCatOwnerDB'

let app = express()
app.use(bodyParser.urlencoded({ extended: true }))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('view options', {
  layout: false
})

// static/public files
app.use(express.static('public'))

app.get('/', (req, res, next) => {
  res.render('home', {
    title: 'Cat list on our site'
  })
  next()
})
mongoose
  .connect(connection)
  .then(() => {
    console.log('Mongodb is up and running!')
    app.use(require('./router/cat'))
    app.use(require('./router/owner'))
  })
  .catch(console.log)


app.get('/config*', (req, res, next) => {
  let err = new Error('Not found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  console.log('hendle that error')
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

app.listen(port, () =>
  console.log(`Express running on port ${port}...`))

