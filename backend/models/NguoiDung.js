const mongoose = require('mongoose');
// là module 

const bcrypt = require('bcryptjs');

const nguoiDungSchema = new mongoose.Schema({
    anhDaiDien: {
        type: String,
        default: 'https://picsum.photos/100/100' // URL ảnh placeholder ổn định
    },
    tenNguoiDung: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hoTen: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    matKhau: {
        type: String,
        required: true
    },
    soDienThoai: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} không phải là số điện thoại hợp lệ!`
        }
    },
    diaChi: [{ type: String }],
    vaiTro: {
        type: String,
        enum: ['nguoidung', 'shop', 'admin'],
        default: 'nguoidung'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

nguoiDungSchema.pre('save', async function (next) {
    if (!this.isModified('matKhau')) return next();
    const salt = await bcrypt.genSalt(10);
    this.matKhau = await bcrypt.hash(this.matKhau, salt);
    next();
});

nguoiDungSchema.methods.soSanhMatKhau = async function (matKhauNhap) {
    return await bcrypt.compare(matKhauNhap, this.matKhau);
};

module.exports = mongoose.model('NguoiDung', nguoiDungSchema);