# Dự án Express.js với HBS

## Giới thiệu
Đây là dự án **Backend sử dụng Express.js** với **HBS (Handlebars)** làm template engine để render giao diện phía server.  
Dự án được khởi tạo bằng **express-generator**, phù hợp cho việc học **Express, MVC và Server-side Rendering**.

---

## Công nghệ sử dụng
- **Node.js**
- **Express.js**
- **HBS (Handlebars)**
- **Nodemon** (dev)
- **npm**

---

## Yêu cầu môi trường
- Node.js >= 16  
- npm  
- Terminal (CMD / PowerShell / Terminal macOS)

---

## Cài đặt & chạy dự án

### Bước 1: Cài đặt `express-generator` (global)
```bash
npm install -g express-generator
```

---

### Bước 2: Tạo project Express với HBS
```bash
express --view=hbs web503
```

---

### Bước 3: Di chuyển vào thư mục dự án
```bash
cd web503
```

---

### Bước 4: Cài đặt các package cần thiết
```bash
npm install
```

---

### Bước 5: Chạy ứng dụng
```bash
npm run start
```

---

### Bước 6: Truy cập ứng dụng
Mở trình duyệt và truy cập:
```
http://127.0.0.1:3000/
```

---

## Chạy dự án với Nodemon (Dev mode)

### Cài đặt Nodemon
```bash
npm install nodemon
```

---

### Cấu hình `package.json`
```json
"scripts": {
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www"
}
```

---

### Chạy ở chế độ development
```bash
npm run dev
```

 Ứng dụng sẽ **tự động reload khi thay đổi code**.

---

## Cấu trúc thư mục
```
web503/
│
├── bin/
│   └── www
├── public/
│   ├── stylesheets/
│   └── images/
├── routes/
│   ├── index.js
│   └── users.js
├── views/
│   ├── layout.hbs
│   ├── index.hbs
│   └── error.hbs
├── app.js
├── package.json
└── README.md
```

---

## Ghi chú
- Dự án sử dụng **Server-side Rendering**
- Có thể mở rộng thêm:
  - Kết nối **MongoDB / MySQL**
  - Xây dựng **REST API**
  - Áp dụng **MVC đầy đủ**
- Phù hợp cho:
  - Sinh viên học Express.js
  - Bài tập / đồ án backend cơ bản

---

## License
Dự án phục vụ mục đích **học tập**.

---

✨ *Happy Coding with Express.js!* ✨
