npm init -y:
khoi tao du an nodejs bang cach tao file package.json

Tệp package.json chứa thông tin về dự án và các phụ thuộc (dependencies) của nó.

express: Framework web nhẹ và linh hoạt cho Node.js, dùng để xây dựng API và xử lý các yêu cầu HTTP (như GET, POST, v.v.).

mongoose: Thư viện ODM (Object Data Modeling) cho MongoDB, giúp tương tác với cơ sở dữ liệu MongoDB một cách dễ dàng bằng cách định nghĩa schema và model.

bcryptjs: Thư viện dùng để mã hóa (hash) và so sánh mật khẩu, đảm bảo an toàn khi lưu trữ mật khẩu người dùng.
jsonwebtoken: Thư viện tạo và xác thực JSON Web Tokens (JWT), thường dùng để xác thực người dùng (authentication) trong các API.

socket.io: Thư viện hỗ trợ giao tiếp thời gian thực (real-time) giữa client và server, thường dùng cho các tính năng như chat, thông báo, hoặc cập nhật trực tiếp.

dotenv: Thư viện tải các biến môi trường từ tệp .env vào dự án, giúp quản lý các cấu hình nhạy cảm như khóa API hoặc thông tin kết nối cơ sở dữ liệu.

cors: Middleware cho Express, cho phép xử lý Cross-Origin Resource Sharing, giúp API của bạn chấp nhận các yêu cầu từ các domain khác.

npm install -D nodemon:
Chức năng: Cài đặt nodemon dưới dạng phụ thuộc phát triển (-D là viết tắt của --save-dev).

nodemon: Công cụ tự động khởi động lại server Node.js khi phát hiện thay đổi trong mã nguồn, giúp tăng hiệu quả trong quá trình phát triển.
