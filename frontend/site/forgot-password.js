//import { productService } from "../model/model.js";
const loginForm = document.querySelector('#form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = document.querySelector('#email').value;

  try {
    const response = await axios.post('http://localhost:3000/api/forgot-password', { email });
    console.log(response);
    if (response.data.status == true) {
      const succesMessage = document.querySelector('#succesMessage');
      succesMessage.textContent = 'Sent email!';
    }
  } catch (error) {
    // Handle login errors, such as displaying an error message to the user
    console.error('Error:', error.response.data);
    // You can display an error message on form or redirect to an error page
    // For example:
    const errorMessage = document.querySelector('#errorMessage');
    errorMessage.textContent = error.response.data.error;
  }
});
