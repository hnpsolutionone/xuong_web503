var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controller/UserController');

/*
Method: POST
/api/login
{
    "email": "phuongnl24@fpt.edu.vn",
    "password": "123456",
}
*/
router.post('/api/login', async function (req, res, next) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Vui lòng cung cấp đầy đủ thông tin." });
    }

    const user = await userController.login(email, password);
    if (!user) {
      return res.status(401).json({ error: "Email hoặc mật khẩu không đúng." });
    }

    // Trả về JWT token bao gồm access token và refresh token
    if (user) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email
      };
      // seed (https://www.npmjs.com/package/jsonwebtoken) với `shhhhh` là secret trong hàm jwt.sign(payload, secretOrPrivateKey, [options, callback])
      // access token là chuỗi ngẫu nhiên, dùng để xác thực người dùng
      const access_token = jwt.sign({ payload }, 'shhhhh', { expiresIn: 1 * 60 });
      // refresh token là chuỗi ngẫu nhiên, dùng để lấy lại access token
      const refresh_token = jwt.sign({ payload }, 'shhhhh', { expiresIn: 90 * 24 * 60 * 60 });
      
      // refresh_token sẽ được lưu trong httpOnly cookie, nghĩa là JS phía client không đọc được
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        /*
        'lax' hoặc 'strict' hoặc 'none':
        - 'lax': cookie sẽ được gửi trong các yêu cầu điều hướng cấp cao (top-level navigation) và các yêu cầu GET được tạo bởi các trang bên ngoài (cross-site).
        - 'strict': cookie chỉ được gửi trong các yêu cầu cùng nguồn (same-site requests), không bao giờ được gửi trong các yêu cầu cross-site.
        - 'none': cookie sẽ được gửi trong tất cả các yêu cầu, bao gồm cả cross-site requests. Tuy nhiên, khi sử dụng 'none', bạn phải đặt thuộc tính 'secure' thành true, nghĩa là cookie chỉ được gửi qua kết nối HTTPS.  
        */
        sameSite: 'lax', 
        secure: false // true nếu dùng HTTPS
      });
      res.status(200).json({ user: payload, access_token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Routes for API
/* POST a user || Register a user
* http://localhost:3000/api/register
*/
router.post('/api/register', async function (req, res, next) {
  try {
    let { name, email, password, confirm_password, age } = req.body;

    if (!name || !email || !password || !confirm_password || !age) {
      return res.status(400).json({ error: "Vui lòng cung cấp đầy đủ thông tin." });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Mật khẩu không trùng khớp." });
    }

    if (await userController.checkExistedEmail(email)) {
      return res.status(400).json({ error: "Email đã được sử dụng." });
    }

    const user = await userController.register(name, email, password, age);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Forgot password
* http://localhost:3000/api/forgot-password
*/
router.post('/api/forgot-password', async function (req, res, next) {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Vui lòng nhập email." });
    }

    const response = await userController.forgotPassword(email);

    if (!response) {
      return res.status(404).json({ error: "Email không tồn tại." });
    }
    
    res.status(201).json({ status: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Reset password
* http://localhost:3000/api/reset-password
*/
router.post('/api/reset-password', async function (req, res, next) {
  try {
    const { password, password_confirmation, token } = req.body;
    const response = await userController.resetPassword(token, password, password_confirmation);
    res.status(200).json({ status: response });
  } catch (error) {
    console.log(error);
    res.status(414).json({ error: error.message });
  }
});

/*
Luồng hoạt động:
POST /api/login
→ server set refresh_token (cookie httpOnly)
→ client nhận access_token

Khi access token hết hạn:

POST /api/refresh-token
(cookie tự gửi)
→ trả access_token mới
*/
router.post('/api/refresh-token', async function (req, res, next) {
  try {
    // Lấy refresh token từ COOKIE, KHÔNG phải body
    const refresh_token = req.cookies.refresh_token;
    console.log("Refresh token:", refresh_token);
    if (!refresh_token) {
      return res.status(401).json({
        error: 'Không có refresh token'
      });
    }

    const data = jwt.verify(refresh_token, 'shhhhh');
 
    const access_token = jwt.sign({ user: data.user }, 'shhhhh', { expiresIn: 1 * 60 }); // 1 second
    new_refresh_token = jwt.sign({ user: data.user }, 'shhhhh', { expiresIn: 90 * 24 * 60 * 60 }); // hết hạn trong 90 ngày

    // Set lại cookie httpOnly
    res.cookie('refresh_token', new_refresh_token, {
      httpOnly: true,
      /*
        'lax' hoặc 'strict' hoặc 'none':
        - 'lax': cookie sẽ được gửi trong các yêu cầu điều hướng cấp cao (top-level navigation) và các yêu cầu GET được tạo bởi các trang bên ngoài (cross-site).
        - 'strict': cookie chỉ được gửi trong các yêu cầu cùng nguồn (same-site requests), không bao giờ được gửi trong các yêu cầu cross-site.
        - 'none': cookie sẽ được gửi trong tất cả các yêu cầu, bao gồm cả cross-site requests. Tuy nhiên, khi sử dụng 'none', bạn phải đặt thuộc tính 'secure' thành true, nghĩa là cookie chỉ được gửi qua kết nối HTTPS.  
        */
      sameSite: 'lax',
      secure: false
    });
    
    res.status(200).json({ user: data.user, access_token });
  } catch (error) {
    res.status(414).json({ error: error.message });
  }
});

module.exports = router;
