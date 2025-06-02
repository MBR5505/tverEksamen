const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.status(501).json({ message: 'Create user - Not implemented' });
});

router.get('/:username', (req, res) => {
    res.status(501).json({ message: 'Get user - Not implemented' });
});

router.get('/', (req, res) => {
    res.status(501).json({ message: 'Get all users - Not implemented' });
});

router.put('/:username', (req, res) => {
    res.status(501).json({ message: 'Update user - Not implemented' });
});

router.delete('/:username', (req, res) => {
    res.status(501).json({ message: 'Delete user - Not implemented' });
});

module.exports = router;
