import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrangChuPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/dang-nhap');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/dang-nhap');
    };

    if (!user) {
        return <div>Đang tải...</div>;
    }

    const avatarUrl = user.anhDaiDien && user.anhDaiDien !== ''
        ? user.anhDaiDien
        : 'https://picsum.photos/100/100';

    return (
        <div>
            <h2>Trang Chủ - Sơn Đồng Mall</h2>
            <h3>Thông tin tài khoản</h3>
            <div>
                <img 
                    src={avatarUrl} 
                    alt="Ảnh đại diện" 
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
                    onError={(e) => { e.target.src = '/fallback-avatar.png'; e.target.onerror = null; }} // Fallback local và dừng retry
                />
                <p><strong>Tên người dùng:</strong> {user.tenNguoiDung}</p>
                <p><strong>Họ tên:</strong> {user.hoTen}</p>
                <p><strong>Email:</strong> {user.mail}</p>
                <p><strong>Số điện thoại:</strong> {user.soDienThoai}</p>
                <p><strong>Địa chỉ:</strong> {user.diaChi.length > 0 ? user.diaChi.join(', ') : 'Chưa có'}</p>
                <p><strong>Vai trò:</strong> {user.vaiTro}</p>
                <p><strong>Ngày tạo:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'Không xác định'}</p>
                <button onClick={handleLogout}>Đăng xuất</button>
            </div>
        </div>
    );
}