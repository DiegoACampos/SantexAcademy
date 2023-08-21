const express = require('express');
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authentication.middleware');
const upload = require('../middleware/multer.middleware');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/edit/:id', isAuthenticated, upload.single('image'), userController.editUser);

module.exports = router;
