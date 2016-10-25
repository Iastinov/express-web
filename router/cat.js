let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let expressValidator = require('express-validator')
// let bodyParser = require('body-parser')

// cat schema
let catSchema = new mongoose.Schema({
  name: { type: String, required: '{PATH} is required!' },
  nickname: String,
  owner: String,
  age: { type: Number, default: 0 },
  creationDate: {type: Date, default: Date.now},
  information: String,
  imgUrls: []
})

let Cat = mongoose.model('Cat', catSchema)

// router usageand export
router.get('/cat/:item', (req, res, next) => {
  if (req.params.item === 'catlist') {
    let catObj = findCat(req, res)
    res.render('catlist', {
      title: 'Cat List',
      catObj: catObj
    })
  } else if (req.params.item === 'addCat') {
    res.render('catform', {
      title: 'Add new Cat to the List'
    })
  } else if (req.params.item === 'details') {
    findCat(req, res)
  }
  console.log(req.params)
  next()
})
router.post('/addCat', (req, res) => {
  console.log(req.body)
  saveCat(req, res)
})
let saveCat = (req, res) => {
  let homeless = req.body.owner || 'homeless'
  new Cat({
    name: req.body.name,
    nickname: req.body.nickname,
    owner: homeless,
    age: req.body.age,
    creationDate: new Date().now,
    information: req.body.information,
    imgUrls: []
  })
  .save()
  .then((result) => {
    if (result) {
      console.log(result)
      res.send('Cat was added successfully')
    }
  })
  .catch((err) => {
    res.render('error', {
      message: err.message
    })
  })
}
let findCat = (req, res) => {
  return Cat.find().then(cats => console.log(cats))
}
module.exports = router

