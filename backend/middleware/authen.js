const jwt = require('jsonwebtoken');

const authen = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            // Kiểm tra authorization với `Bear access_token`
            const token = req.headers.authorization.split(' ')[1];
            const data = jwt.verify(token, 'shhhhh');
            req.user = data.user;
            next(); // nếu kiểm tra (verify) access_token thành công thì "đi tiếp"
        } else { // ngược lại verify access_token không đúng thì báo lỗi
            res.status(401).json({ error: 'Not authoried!!' });
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = authen;