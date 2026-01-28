//import { productService } from "../model/model.js";
const loginForm = document.querySelector('#form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  // given url string
  let url_str = window.location.href;
  console.log(url_str);

  let url = new URL(url_str);
  let search_params = url.searchParams; 

  // get value of "id" parameter
  let token = search_params.get('token');
  console.log(token);

  const password = document.querySelector('#password').value;
  const password_confirmation = document.querySelector('#password_confirmation').value;

  try {
    const response = await axios.post('http://localhost:3000/users/api/reset-password', { password, password_confirmation, token });
    console.log(response);
    if (response.data.status == true) {
      const succesMessage = document.querySelector('#succesMessage');
      succesMessage.textContent = 'Changed password!';
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
