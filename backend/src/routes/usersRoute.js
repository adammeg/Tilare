const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/changeStatus', userController.changeVerifiedStatus);
router.get('/users', userController.getAllUsers)
module.exports = router;
