//import { productService } from "../model/model.js";
const loginForm = document.querySelector('#form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    // { withCredentials: true } để gửi cookie (refresh token) vào DevTools → Application → Cookies
    const response = await axios.post('http://localhost:3000/api/login', { email, password }, { withCredentials: true });
    // Assuming the login API returns some kind of authentication token upon successful login
    const accessToken = response.data.access_token;
    
    // You can handle the token as needed, such as storing it in localStorage for further requests
    localStorage.setItem('accessToken', accessToken);
    
    // Redirect to another page upon successful login
    window.location.href = '../admin/index.html'; // Change the URL to the dashboard page
  } catch (error) {
    // Handle login errors, such as displaying an error message to the user
    console.error('Login failed:', error.response.data);
    // You can display an error message on the login form or redirect to an error page
    // For example:
    const errorMessage = document.querySelector('#errorMessage');
    errorMessage.textContent = error.response.data.error;
  }
});
