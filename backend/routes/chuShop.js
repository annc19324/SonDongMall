const express = require('express');
const router = express.Router();

// GET /api/chuShop/test
router.get('/test', (req, res) => {
    res.json({ message: 'chuShop route is working' });
});

module.exports = router;
