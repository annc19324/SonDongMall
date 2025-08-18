const mongoose = require('mongoose');
// là module mongoose để kết nối và tương tác với MongoDB

const bcrypt = require('bcryptjs');
// thư viện để mã hóa mật khẩu

const nguoiDungSchema = new mongoose.Schema({
    anhDaiDien: {
        type: String,
        // default: 'https://picsum.photos/100/100' // URL ảnh placeholder ổn định
        default: 'https://place.dog/100/100'
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
    // là middleware pre-save của mongoose. chạy trước khi lưu tài liệu vào DB
    if (!this.isModified('matKhau')) return next(); // nếu mật khẩu không thay đổi thì không cần mã hóa lại
    const salt = await bcrypt.genSalt(10); // tạo salt với độ dài 10
    this.matKhau = await bcrypt.hash(this.matKhau, salt); // mã hóa mật khẩu với salt
    next(); // tiếp tục với middleware tiếp theo
});

nguoiDungSchema.methods.soSanhMatKhau = async function (matKhauNhap) {
    // là phương thức để so sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong DB
    return await bcrypt.compare(matKhauNhap, this.matKhau);
    // trả về true nếu mật khẩu nhập vào đúng, false nếu sai
};

module.exports = mongoose.model('NguoiDung', nguoiDungSchema);
// là hàm model của mongoose để tạo model từ schema, chức năng tạo model NguoiDung để tương tác với collection trong MongoDB