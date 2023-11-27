const express = require('express');
const ProductController = require('../controllers/ProductController');
const Authentication = require('../middleware/Authentication');
const Authorization = require('../middleware/Authorization');
const router = express.Router();


router.post('/', Authentication, Authorization, ProductController.create);

module.exports = router;