const express = require('express');
const router = express.Router();
const {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/:username', getUser);
router.get('/', getAllUsers);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

module.exports = router;
