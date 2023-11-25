const express = require('express');
const Authentication = require('../middleware/Authentication');
const Authorization = require('../middleware/Authorization');
const CategoriesController = require('../controllers/CategoriesController');

const router = express.Router();


router.post('/', Authentication, Authorization, CategoriesController.create)
router.get('/', Authentication, Authorization, CategoriesController.get)
router.patch('/:categoryId', Authentication, Authorization, CategoriesController.update)
router.delete('/:categoryId', Authentication, Authorization, CategoriesController.delete)
module.exports = router;