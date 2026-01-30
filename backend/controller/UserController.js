const userService = require('../services/UserServices');

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

module.exports = { register, checkExistedEmail, login };