const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (name, email, password, age) => {
    // insert into users (name, email, password, age) 
    // values (name, email, password, age)
    // 1. Tạo user mới
    // 2. Lưu user mới
    // 3. Trả về user mới
    // Cách dùng: https://www.npmjs.com/package/bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new userModel({ name, email, password: hash, age });
    await user.save();
    return user;
}

const login = async (email, password) => {
    // 1. Tìm user theo email: select email, password, name, id from users where email = email
    // 2. So sánh password
    // 3. Trả về user nếu đúng, null nếu sai
    const user = await userModel.findOne({ email });
    // kiểm tra password đã mã hóa
    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
}

const checkExistedEmail = async (email) => {
    // SQL: select * from users where email = email
    const user = await userModel.findOne({ email: email }); //.findOne({ email: email })
    return user;
}

const forgotPassword = async (email) => {
    // 1. Tìm user theo email
    // 2. Tạo token mới
    // 3. Lưu token mới vào user
    // 4. Gửi email có chứa token
    const user = await userModel.findOne({ email });
    if (user) {
        const token = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: 5 * 60 * 60 }); // 5 phút
        user.token_reset_password = token;
        await user.save();
        return token;
    }
    return null;
}
const resetPassword = async (token, password) => {
    // 1. Tìm user theo token trong database
    // 2. Nếu user tồn tại thì tiếp tục
    // 3. Nếu token hợp lệ, thì cập nhật password mới
    // 4. Trả về user
    // console.log(token);
    const user = await userModel.findOne({ token_reset_password: token });
    // console.log(user)
    if (user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash;
        user.token_reset_password = null;
        await user.save();
        return true;
    }
    return false;
}

module.exports = { register, checkExistedEmail, login, forgotPassword, resetPassword };