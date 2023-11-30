const express = require('express');
const TransactionsHistoryController = require('../controllers/TransactionsHistoryController');
const Authentication = require('../middleware/Authentication');
const Authorization = require('../middleware/Authorization');
const router = express.Router();


router.post('/', Authentication, TransactionsHistoryController.create);
router.get('/user', Authentication, TransactionsHistoryController.readuser);
router.get('/admin', Authentication, Authorization, TransactionsHistoryController.readadmin);
router.get('/:transactionId', Authentication, Authorization, TransactionsHistoryController.getbyid);

module.exports = router;