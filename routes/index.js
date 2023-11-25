const express = require('express');
const router = express.Router();
const usersRoute = require('./users')
const categoriesRoute = require('./categories')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toko Belanja Web APi' });
});

router.use('/users', usersRoute)
router.use('/categories', categoriesRoute)

module.exports = router;
