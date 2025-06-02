const User = require('../models/userModel');
const argon2 = require('argon2');

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await argon2.hash(password);
        
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            username: user.username
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('username');
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const updates = req.body;

        if (updates.password) {
            updates.password = await argon2.hash(updates.password);
        }

        const user = await User.findOneAndUpdate(
            { username },
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ username: req.params.username });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};
