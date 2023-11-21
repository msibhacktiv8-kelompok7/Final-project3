var express = require('express');
var router = express.Router();
const usersRoute = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toko Belanja Web APi' });
});

router.use('/users', usersRoute)

module.exports = router;
