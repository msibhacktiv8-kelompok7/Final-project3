const express = require('express');
const ProductController = require('../controllers/ProductController');
const Authentication = require('../middleware/Authentication');
const Authorization = require('../middleware/Authorization');
const router = express.Router();


router.post('/', Authentication, Authorization, ProductController.create);
router.get('/', Authentication,  ProductController.read);
router.put('/:productId', Authentication, Authorization, ProductController.update);
router.patch('/:productId', Authentication, Authorization, ProductController.updatePatch);
router.delete('/:productId', Authentication, Authorization, ProductController.delete);

module.exports = router;