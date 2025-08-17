import { useState } from 'react';
import api from '../api';

export default function DangKy() {
    const [mail, setMail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [tenNguoiDung, setTenNguoiDung] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mail || !matKhau || !tenNguoiDung || !hoTen || !soDienThoai) {
            setMessage('Vui lòng điền đầy đủ thông tin required');
            return;
        }
        if (matKhau.length < 6) {
            setMessage('Mật khẩu phải ít nhất 6 ký tự');
            return;
        }
        if (!/\d{10}/.test(soDienThoai)) {
            setMessage('Số điện thoại phải là 10 chữ số');
            return;
        }

        try {
            const res = await api.post('/api/auth/register', {
                mail,
                matKhau,
                tenNguoiDung,
                hoTen,
                soDienThoai,
                diaChi: diaChi ? [diaChi] : []
            });
            setMessage(res.data.message || 'Đăng ký thành công!');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Lỗi đăng ký');
        }
    };

    return (
        <div>
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tên người dùng"
                    value={tenNguoiDung}
                    onChange={(e) => setTenNguoiDung(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="Họ tên đầy đủ"
                    value={hoTen}
                    onChange={(e) => setHoTen(e.target.value)}
                    required
                />
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={matKhau}
                    onChange={(e) => setMatKhau(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="Số điện thoại (10 chữ số)"
                    value={soDienThoai}
                    onChange={(e) => setSoDienThoai(e.target.value)}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="Địa chỉ (tùy chọn)"
                    value={diaChi}
                    onChange={(e) => setDiaChi(e.target.value)}
                />
                <br />
                <button type="submit">Đăng ký</button>
                <button>
                    <a href="/dang-nhap">Đăng nhập</a>
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}