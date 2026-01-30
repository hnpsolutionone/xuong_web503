const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');

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

module.exports = { register, checkExistedEmail, login };