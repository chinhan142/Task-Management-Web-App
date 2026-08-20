# Danh Sách Các Điểm Cần Tối Ưu & Fix Trong Module Auth (Module 1)

File này tổng hợp các điểm nhỏ cần chỉnh sửa hoặc tối ưu trong Module Auth để bạn tiện xem và tự fix lại sau khi hoàn thành Module Project hôm nay.

---

## 1. File `src/services/auth.service.js`

### 🔹 1.1. Status Code khi không tìm thấy User (`getProfileService`)
* **Vị trí**: Dòng 82 - 84
* **Vấn đề**: Khi không tìm thấy người dùng (`!user`), hiện tại đang trả về status `400` (Bad Request).
* **Đề xuất fix**: Đổi thành **`404` (Not Found)** để tuân thủ đúng chuẩn RESTful API khi không tìm thấy tài nguyên.

### 🔹 1.2. Status Code khi trùng Email (`registerService`)
* **Vị trí**: Dòng 14 - 16
* **Vấn đề**: Khi email đã tồn tại, code đang trả về status `400`.
* **Đề xuất fix**: Có thể giữ `400` hoặc đổi sang **`409` (Conflict)** để thể hiện rõ xung đột dữ liệu (Email đã được đăng ký trước đó).

### 🔹 1.3. Dọn dẹp thư viện Import không sử dụng (Unused Imports)
* **Vị trí**: Dòng 3 và dòng 4
* **Vấn đề**:
  - `import env from "dotenv";` (biến `env` không được sử dụng trong file).
  - `import bcrypt, { hash } from "bcryptjs";` (hàm `{ hash }` không được sử dụng trực tiếp).
* **Đề xuất fix**: Xóa bỏ các import thừa để code sạch sẽ hơn.

---

## 2. File `src/middlewares/auth.middleware.js`

### 🔹 2.1. Chuẩn hóa luồng bắt lỗi (Error Handling) trong Middleware `validateToken`
* **Vị trí**: Trong hàm `validateToken`
* **Vấn đề**:
  - Hiện tại khi `!authHeader`, code gọi `errorResponse(...)` làm `throw Error` trực tiếp.
  - Trong khối `catch (error)`, code lại tiếp tục gọi `errorResponse(...)` dẫn tới việc `throw Error` lần 2 bên trong khối catch.
* **Đề xuất fix**: Trong Express middleware, chuẩn nhất là dùng `return next(error);` để chuyển lỗi sang cho **Global Error Handler** xử lý thay vì `throw` tự do.
  ```javascript
  // Ví dụ luồng chuẩn:
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Please login to continue!");
    error.status = 401;
    return next(error);
  }
  ```

---

## 3. File `src/middlewares/validate.middleware.js`

### 🔹 3.1. Bổ sung Trim Email & Password
* **Vấn đề**: Người dùng có thể vô tình gõ khoảng trắng ở đầu/cuối email hoặc password khi nhập form đăng ký/đăng nhập.
* **Đề xuất fix**: Nên `.trim()` dữ liệu `email` trước khi kiểm tra Regex hoặc lưu vào cơ sở dữ liệu.
