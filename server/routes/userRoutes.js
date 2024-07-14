const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', upload.single('photo'), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', verifyToken, userController.getUsers);
router.get('/users/:id', verifyToken, userController.getUserById);

module.exports = router;
