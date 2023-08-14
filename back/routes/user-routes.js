const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.login);
router.put('/edit/:id', userController.editUser);

module.exports = router;
