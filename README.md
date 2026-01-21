I. Cài đặt dự án:
Backend: Tạo project express có view là HBS với Terminal (CMD)
B1: Lệnh cài đặt express-generator cho global: 
npm install -g express-generator 
B2: Tạo project với template engine hbs:
express --view=hbs web503
B3: Vào thư mục dự án demo01:
     cd web503
B4: Cài các gói có trong file package.json:
     npm install
B5: Chạy ứng dụng:
     npm run start
B6: Xem kết quả http://127.0.0.1:3000/

II. Cài đặt nodemon tại thư mục dự án: npm i nodemon
"dev": "nodemon ./bin/www"

