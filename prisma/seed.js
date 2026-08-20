import prisma from "../src/config/prisma.config.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Starting seed database...");

  // 1. Hash password chuẩn: Nhan123@
  const defaultPassword = await bcrypt.hash("Nhan123@", 10);

  // 2. Tạo hoặc Cập nhật danh sách Users mẫu
  const userTai = await prisma.user.upsert({
    where: { email: "tai123@gmail.com" },
    update: { password: defaultPassword },
    create: {
      name: "Tài",
      email: "tai123@gmail.com",
      password: defaultPassword,
      phone: "0901234567",
    },
  });

  const userNhan = await prisma.user.upsert({
    where: { email: "nhan123@gmail.com" },
    update: { password: defaultPassword },
    create: {
      name: "Nhân",
      email: "nhan123@gmail.com",
      password: defaultPassword,
      phone: "0909876543",
    },
  });

  const userHung = await prisma.user.upsert({
    where: { email: "hung123@gmail.com" },
    update: { password: defaultPassword },
    create: {
      name: "Hùng",
      email: "hung123@gmail.com",
      password: defaultPassword,
      phone: "0912345678",
    },
  });

  const userLinh = await prisma.user.upsert({
    where: { email: "linh123@gmail.com" },
    update: { password: defaultPassword },
    create: {
      name: "Linh",
      email: "linh123@gmail.com",
      password: defaultPassword,
      phone: "0934567890",
    },
  });

  console.log("✅ Seed Users completed!");

  // 3. Reset dữ liệu cũ và đưa bộ đếm AUTO_INCREMENT về 1
  await prisma.task.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.$executeRawUnsafe(`ALTER TABLE projects AUTO_INCREMENT = 1;`);
  await prisma.$executeRawUnsafe(`ALTER TABLE tasks AUTO_INCREMENT = 1;`);

  // 4. Tạo Dự án 1: Task Management Web App (Owner: Tài)
  const project1 = await prisma.project.create({
    data: {
      name: "Task Management Web App",
      description: "Dự án Capstone Quản lý công việc nhóm với Node.js & Prisma",
      startDate: new Date("2026-08-01"),
      endDate: new Date("2026-08-30"),
      ownerId: userTai.id,
      members: {
        create: [
          { userId: userTai.id, role: "OWNER" },
          { userId: userNhan.id, role: "MEMBER" },
          { userId: userHung.id, role: "MEMBER" },
        ],
      },
    },
  });

  // 5. Tạo Dự án 2: Website Bán Hàng E-Commerce (Owner: Nhân)
  const project2 = await prisma.project.create({
    data: {
      name: "Website Bán Hàng E-Commerce",
      description: "Xây dựng website bán hàng thời trang trực tuyến",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-10-15"),
      ownerId: userNhan.id,
      members: {
        create: [
          { userId: userNhan.id, role: "OWNER" },
          { userId: userLinh.id, role: "MEMBER" },
          { userId: userTai.id, role: "MEMBER" },
        ],
      },
    },
  });

  console.log("✅ Seed Projects & Members completed!");

  // 6. Tạo Các Tasks Mẫu cho Dự án 1
  await prisma.task.createMany({
    data: [
      {
        title: "Thiết kế DB Schema & Prisma",
        description: "Tạo các model User, Project, ProjectMember, Task trong schema.prisma",
        status: "DONE",
        priority: "HIGH",
        dueDate: new Date("2026-08-15"),
        projectId: project1.id,
        assigneeId: userTai.id,
        createdById: userTai.id,
      },
      {
        title: "Xây dựng API Authentication & Authorization",
        description: "API Đăng ký, Đăng nhập (JWT), Get Profile, Middleware kiểm tra token",
        status: "DONE",
        priority: "HIGH",
        dueDate: new Date("2026-08-18"),
        projectId: project1.id,
        assigneeId: userTai.id,
        createdById: userTai.id,
      },
      {
        title: "Xây dựng API Quản lý Dự án (Project)",
        description: "CRUD Dự án và quản lý thành viên (Thêm/Gỡ member)",
        status: "DOING",
        priority: "HIGH",
        dueDate: new Date("2026-08-21"),
        projectId: project1.id,
        assigneeId: userNhan.id,
        createdById: userTai.id,
      },
      {
        title: "Xây dựng API Quản lý Task",
        description: "CRUD Task, gán người thực hiện, cập nhật nhanh trạng thái Task",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date("2026-08-23"),
        projectId: project1.id,
        assigneeId: userHung.id,
        createdById: userTai.id,
      },
    ],
  });

  // 7. Tạo Các Tasks Mẫu cho Dự án 2
  await prisma.task.createMany({
    data: [
      {
        title: "Thiết kế UI/UX trang Chủ (Home Page)",
        description: "Vẽ mockup giao diện trang chủ trên Figma",
        status: "DOING",
        priority: "MEDIUM",
        dueDate: new Date("2026-09-05"),
        projectId: project2.id,
        assigneeId: userLinh.id,
        createdById: userNhan.id,
      },
      {
        title: "Tích hợp Cổng thanh toán VNPay",
        description: "Cấu hình API thanh toán VNPay Sandbox",
        status: "TODO",
        priority: "HIGH",
        dueDate: new Date("2026-09-20"),
        projectId: project2.id,
        assigneeId: userTai.id,
        createdById: userNhan.id,
      },
    ],
  });

  console.log("✅ Seed Tasks completed!");
  console.log("🎉 Seed data successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
