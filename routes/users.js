const express = require('express');
const UserController = require('../controllers/UserController');
const Authentication = require('../middleware/Authentication');
const router = express.Router();


router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.put('/', Authentication, UserController.update);
router.delete('/', Authentication, UserController.delete);
router.patch('/topup', Authentication, UserController.topup);

module.exports = router;
