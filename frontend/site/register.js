//import { productService } from "../model/model.js";
const registerForm = document.querySelector('#form');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirm_password = document.querySelector('#confirm_password').value;

  try {
    const response = await axios.post('http://localhost:3000/users/api/register', 
      { name, age, email, password, confirm_password });
    // Redirect to another page upon successful register
    window.location.href = '/ASM_ES6/site'; // Change the URL to the dashboard page
  } catch (error) {
    // Handle register errors, such as displaying an error message to the user
    console.error('Register failed:', error.response.data);
    // You can display an error message on the register form
    const errorMessage = document.querySelector('#errorMessage');
    errorMessage.textContent = error.response.data.error;
  }
});
