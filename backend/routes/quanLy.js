const express = require('express');
const router = express.Router();

// GET /nguoiQuanLy/chuShop/test
router.get('/test', (req, res) => {
    res.json({ message: 'quanLy route is working' });
});

module.exports = router;
