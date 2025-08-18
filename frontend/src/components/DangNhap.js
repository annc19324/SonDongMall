import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function DangNhap() {
    // const [tenNguoiDung, setTenNguoiDung] = useState('');

    const [identifier, setIdentifier] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!identifier || !matKhau) {
            setMessage('Vui lòng nhập tên người dùng và mật khẩu');
            return;
        }

        try {
            const res = await api.post('/api/auth/login', { identifier, matKhau });
            const { token, nguoiDung } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(nguoiDung));

            setMessage('Đăng nhập thành công!');
            navigate('/trang-chu');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Lỗi đăng nhập');
        }
    };

    return (
        <div>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tên người dùng"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
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
                <button type="submit">Đăng nhập</button>
                <button>
                    <a href="/dang-ky">Đăng ký</a>
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
