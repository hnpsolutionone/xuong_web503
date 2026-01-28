//import { productService } from "../model/model.js";
const loginForm = document.querySelector('#form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await axios.post('http://localhost:3000/users/api/login', { email, password });
    // Assuming the login API returns some kind of authentication token upon successful login
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    
    // You can handle the token as needed, such as storing it in localStorage for further requests
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    // Redirect to another page upon successful login
    window.location.href = '/ASM_ES6/admin'; // Change the URL to the dashboard page
  } catch (error) {
    // Handle login errors, such as displaying an error message to the user
    console.error('Login failed:', error.response.data);
    // You can display an error message on the login form or redirect to an error page
    // For example:
    const errorMessage = document.querySelector('#errorMessage');
    errorMessage.textContent = error.response.data.error;
  }
});
