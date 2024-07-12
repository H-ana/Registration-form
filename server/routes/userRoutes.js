const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

router.post('/register', upload.single('photo'), userController.registerUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);

module.exports = router;
