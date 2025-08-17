const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const authRoutes = require('./routes/auth');
const sanPhamRoutes = require('./routes/sanPham');
const donHangRoutes = require('./routes/donHang');
const gioHangRoutes = require('./routes/gioHang');
const yeuThichRoutes = require('./routes/yeuThich');
const quanLyRoutes = require('./routes/quanLy');
const chuShopRoutes = require('./routes/chuShop');

app.use('/api/auth', authRoutes);
app.use('/api/sanpham', sanPhamRoutes);
app.use('/api/donhang', donHangRoutes);
app.use('/api/giohang', gioHangRoutes);
app.use('/api/yeuthich', yeuThichRoutes);
app.use('/api/quanly', quanLyRoutes);
app.use('/api/chushop', chuShopRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Kết nối đến MongoDB thành công'))
    .catch(err => {
        console.error('Kết nối đến MongoDB thất bại:', err);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Sơn Đồng Mall backend is running');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Lỗi server: ' + err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

