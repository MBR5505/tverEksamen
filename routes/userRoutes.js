const express = require('express');
const router = express.Router();
const { protect, adminOnly, isOwnerOrAdmin } = require('../middleware/authMiddleware');
const { login } = require('../controllers/authController');
const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.post('/login', login);
router.post('/', createUser);
router.get('/:username', protect, getUser);
router.get('/', protect, getAllUsers);
router.put('/:username', protect, isOwnerOrAdmin, updateUser);
router.delete('/:username', protect, adminOnly, deleteUser);

module.exports = router;
