const express = require('express');
const router = express.Router();

// GET /sanPham/chuShop/test
router.get('/test', (req, res) => {
    res.json({ message: 'sanPham route is working' });
});

module.exports = router;
