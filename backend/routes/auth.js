const express = require('express');
const jwt = require('jsonwebtoken');
const NguoiDung = require('../models/NguoiDung');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {
            tenNguoiDung, hoTen, mail, matKhau, soDienThoai, diaChi = []
        } = req.body;

        const tonTaiMail = await NguoiDung.findOne({ mail });
        if (tonTaiMail) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }
        const tonTaiTen = await NguoiDung.findOne({ tenNguoiDung });
        if (tonTaiTen) {
            return res.status(400).json({ message: 'Tên người dùng đã tồn tại' });
        }
        const tonTaiPhone = await NguoiDung.findOne({ soDienThoai });
        if (tonTaiPhone) {
            return res.status(400).json({ message: 'Số điện thoại đã tồn tại' });
        }

        const nguoiDungMoi = new NguoiDung({
            tenNguoiDung,
            hoTen,
            mail,
            matKhau,
            soDienThoai,
            diaChi
        });
        await nguoiDungMoi.save();

        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { mail, matKhau } = req.body;

        const nguoiDung = await NguoiDung.findOne({ mail });
        if (!nguoiDung) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        const isMatch = await nguoiDung.soSanhMatKhau(matKhau);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }

        const token = jwt.sign(
            { id: nguoiDung._id, vaiTro: nguoiDung.vaiTro },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Đăng nhập thành công',
            token,
            nguoiDung: {
                id: nguoiDung._id,
                tenNguoiDung: nguoiDung.tenNguoiDung,
                hoTen: nguoiDung.hoTen,
                mail: nguoiDung.mail,
                soDienThoai: nguoiDung.soDienThoai,
                diaChi: nguoiDung.diaChi,
                vaiTro: nguoiDung.vaiTro,
                createdAt: nguoiDung.createdAt,
                anhDaiDien: nguoiDung.anhDaiDien
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server: ' + err.message });
    }
});

module.exports = router;