const express = require('express');
const router = express.Router();

// GET /gioHang/chuShop/test
router.get('/test', (req, res) => {
    res.json({ message: 'gioHang route is working' });
});

module.exports = router;
