let express = require('express')
let router = express.Router()
//let bodyParser = require('body-parser')
let path = require('path')

//router.use(bodyParser.urlencoded({ extended: true }))
router.get('/cat/:item', (req, res, next) => {
  if (req.params.item === 'catlist') {
    res.render('catlist', {
      title: 'Cat List'
    })
  } else if (req.params.item === 'addCat') {
    res.render('catform', {
        title: 'Add new Cat to the List'
    })
  }
  console.log(req.params)
  next()
})
router.post('/addCat', (req, res) => {
    console.log('post method')
})

module.exports = router;

