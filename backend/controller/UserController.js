const userService = require('../services/UserServices');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const getConstants = require('../helpers/constants').getConstants;

const register = async (name, email, password, age) => {
    const user = await userService.register(name, email, password, age);
    return user;
}

const login = async (email, password) => {
    const user = await userService.login(email, password);
    return user;
}

const checkExistedEmail = async (email) => {
    const user = await userService.checkExistedEmail(email);
    return user;
}

// Tham khảo https://nodemailer.com/
const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use true for port 465, false for port 587
    auth: {
        user: getConstants().MAIL,
        pass: getConstants().APP_PASSWORD,
    },
});

const forgotPassword = async (email) => {
    const token = await userService.forgotPassword(email);
    if (token) {
        const mailOptions = {
            from: getConstants().MAIL, // gửi từ mail nào
            to: email, // gửi đến mail nào
            subject: 'Reset password',
            html: `<a href="http://localhost:5500/web503/frontend/site/reset-password.html?token=${token}">Reset password</a>`
        };
        await transporter.sendMail(mailOptions)
        return true;
    }
    return false;
}

const resetPassword = async (token, password, confirm_password) => {
    // Kiểm tra password và confirm password có trùng không?
    if (password !== confirm_password) {
        throw new Error('Mật khẩu và xác nhận mật khẩu không trùng khớp.');
    }
    // Kiểm tra token này có hợp lệ không?
    const data = jwt.verify(token, 'shhhhh');
    if (data && data.id) {
        const result = await userService.resetPassword(token, password);
        return result;
    }
    return false;
}

module.exports = { register, checkExistedEmail, login, forgotPassword, resetPassword };