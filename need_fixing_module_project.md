# Danh Sách Các Điểm Cần Tối Ưu & Fix Trong Module Project (Module 2)

File này tổng hợp các điểm gợi ý nâng cấp cho Module Project để bạn xem lại và tối ưu sau khi hoàn thành xong bộ khung tính năng chính.

---

## 1. File `src/services/project.service.js`

### 🔹 1.1. Bổ sung `id` dự án trong `getProjectList`
* **Vị trí**: Dòng 11 - 18 (Hàm `getProjectList`)
* **Vấn đề**: Đang thiếu trường `id` trong phần `project.select`.
* **Tác hại**: Client/Postman không biết ID của dự án để tiếp tục gọi các API chi tiết (`GET /projects/:id`) hoặc tạo task.
* **Đề xuất fix**: Thêm `id: true` vào `project: { select: { id: true, name: true, ... } }`.

### 🔹 1.2. Mở rộng quyền xem chi tiết cho Member trong `getProjectDetail`
* **Vị trí**: Dòng 25 - 34 (Hàm `getProjectDetail`)
* **Vấn đề**: `where: { id: Number(id), ownerId: Number(userId) }` hiện tại chỉ cho phép người làm **Owner** xem chi tiết dự án.
* **Đề xuất fix**: Mở rộng kiểm tra qua bảng `ProjectMember` để người có vai trò **Member** cũng xem được dự án mình tham gia.

### 🔹 1.3. Bắt lỗi không tìm thấy Dự án (404 Not Found)
* **Vấn đề**: Khi tìm dự án bằng ID không tồn tại, Prisma trả về `null`. Controller sẽ gửi phản hồi mã `200 OK` kèm `data: null`.
* **Đề xuất fix**: Thêm `if (!project) errorResponse("Project not found!", 404);` trước khi `return project`.

### 🔹 1.4. Trả về danh sách Thành viên trong `getProjectDetail`
* **Vấn đề**: Khi xem chi tiết dự án, client thường cần danh sách các thành viên đang tham gia.
* **Đề xuất fix**: Dùng `select` hoặc `include` thêm mối quan hệ `members`:
  ```javascript
  members: {
    select: {
      role: true,
      user: {
        select: { id: true, name: true, email: true }
      }
    }
  }
  ```
