let express = require('express')
let router = express.Router()
//let bodyParser = require('body-parser')
let path = require('path')

//router.use(bodyParser.urlencoded({ extended: true }))
router.get('/owner/:item', (req, res, next) => {
  if (req.params.item === 'ownerlist') {
    res.render('ownerlist', {
      title: 'owner List'
    })
  } else if (req.params.item === 'addowner') {
    res.render('ownerform', {
        title: 'Add new owner to the List'
    })
  }
  console.log(req.params)
  next()
})
router.post('/addowner', (req, res) => {
    console.log('post method')
})

module.exports = router;
