const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    const { username, email, password, name, age, gender, phoneNumber, address } = req.body;
    const photo = req.file ? req.file.filename : null;

    console.log('Received registration data:', req.body);

    if (!username || !email || !password || !name || !age || !gender || !phoneNumber || !address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.includes(' ')) {
        return res.status(400).json({ error: 'Password should not contain spaces' });
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, name, age, gender, phoneNumber, address, photo });
        await newUser.save();
        console.log('User saved:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    getUsers,
    getUserById,
};
