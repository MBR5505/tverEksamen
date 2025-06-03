const express = require('express');
const router = express.Router();
const { protect, adminOnly, isOwnerOrAdmin } = require('../middleware/authMiddleware');
const { login, logout } = require('../controllers/authController');
const { strictLimiter, standardLimiter } = require('../middleware/rateLimitMiddleware');
const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.post('/login', standardLimiter, login);
router.post('/logout', standardLimiter, protect, logout);
router.post('/', strictLimiter, createUser);
router.get('/:username', standardLimiter, protect, getUser);
router.get('/', standardLimiter, protect, getAllUsers);
router.put('/:username', standardLimiter, protect, isOwnerOrAdmin, updateUser);
router.delete('/:username', strictLimiter, protect, adminOnly, deleteUser);

module.exports = router;
