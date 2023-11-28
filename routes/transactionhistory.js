const express = require('express');
const TransactionsHistoryController = require('../controllers/TransactionsHistoryController');
const Authentication = require('../middleware/Authentication');
const router = express.Router();


router.post('/', Authentication,TransactionsHistoryController.create);
router.get('/user', Authentication,TransactionsHistoryController.read);

module.exports = router;