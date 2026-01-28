import { productService } from "../model/model.js";
const detailPro= document.getElementById('detailPro');

// given url string
let url_str = window.location.href;
console.log(url_str);

let url = new URL(url_str);
let search_params = url.searchParams; 

// get value of "id" parameter
let id = search_params.get('id');
console.log(id);

productService.fetchData(`http://localhost:3000/products/api/products/${id}`).then(res=> {
console.log(res.data);
detailPro.innerHTML+=`
    <div class="">
    <img src="${res.data.image}" alt="" />
    <br />
    <span>${res.data.name}</span>
    <br />
    <p class="gia">${res.data.price}đ <del> ${res.data.quantity}</del></p>
    <p class="online-gia-re">${res.data.description}</p>
  </div>
    `;
});
