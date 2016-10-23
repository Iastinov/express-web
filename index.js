let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let cat = require('./router/cat')
let querystring = require('querystring')
let port = 1234

let app = express()
app.use(bodyParser.urlencoded({ extended: true }))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// static/public files
app.use(express.static('public'))

app.get('/', (req, res, next) => {
  res.send('something for default')
  next()
})
app.get('/cat/:item', (req, res, next) => {
  if (req.params.item === 'catlist') {
    res.render('catlist', {
      title: 'Cat List'
    })
  } else if (req.params.item === 'addCat') {
    
    res.render('catform', {
        titel: 'Add new Cat to the List'
    })
  }
  console.log(req.params)
  next()
})
app.post('/addCat', (req, res) => {
    cat.logger()
})
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

