const express = require('express');
const router = express.Router();

// GET /donHang/chuShop/test
router.get('/test', (req, res) => {
    res.json({ message: 'donHang route is working' });
});

module.exports = router;
